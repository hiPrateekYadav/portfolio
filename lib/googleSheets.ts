/**
 * Google Sheets data fetcher.
 *
 * Reads tabs from a spreadsheet published to the web (File → Share → Publish to web)
 * as CSV and parses them into row objects. Results are cached in memory and
 * localStorage, and concurrent requests for the same tab are de-duplicated.
 */

const SPREADSHEET_ID = '2PACX-1vRl6IWX3IxeY3l4DL2IMppLGAybd_CPSQ8kPN-sT4aXqX6hCkWf21abCoau4SPAO2sEa5mhafZ-vRus';

const SHEET_GIDS = {
  logos: 0,
  services: 555445577,
  socials: 1790388490,
  stats: 1053967718,
  works: 115248641,
  about: 1175762006,
  blogs: 1022924521,
  process: 728050388,
  skills: 2135739630,
  projects: 1578879253,
  letsTalk: 1385185861,
  recruiter_profile: 1053965942,
  recruiter_metrics: 979621296,
  recruiter_experience: 871071620,
  recruiter_case_studies: 832310646,
  recruiter_toolkit: 2020363152,
  recruiter_credentials: 897574146,
} as const;

export type SheetName = keyof typeof SHEET_GIDS;

type CacheEntry<T> = { data: T[]; timestamp: number };
const memoryCache = new Map<string, CacheEntry<unknown>>();
const inFlight = new Map<string, Promise<unknown[]>>();
const DEFAULT_TTL_MS = 10 * 60 * 1000;

function getLocalStorageKey(sheetName: string) {
  return `gs_cache_${sheetName}`;
}

function readLocalCache<T>(sheetName: string): CacheEntry<T> | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = window.localStorage.getItem(getLocalStorageKey(sheetName));
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (!parsed || !Array.isArray(parsed.data) || typeof parsed.timestamp !== 'number') return null;
    return parsed as CacheEntry<T>;
  } catch {
    return null;
  }
}

function writeLocalCache<T>(sheetName: string, entry: CacheEntry<T>) {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(getLocalStorageKey(sheetName), JSON.stringify(entry));
  } catch {
    // Ignore quota or serialization errors
  }
}

function getSheetCSVUrl(sheetName: SheetName): string {
  return `https://docs.google.com/spreadsheets/d/e/${SPREADSHEET_ID}/pub?gid=${SHEET_GIDS[sheetName]}&single=true&output=csv`;
}

/**
 * Fetches a sheet tab and parses it into row objects keyed by the header row.
 * Pass `forceRefresh` to bypass the memory and localStorage caches.
 */
export async function fetchSheetDataByName<T>(
  sheetName: SheetName,
  options: { ttlMs?: number; forceRefresh?: boolean } = {}
): Promise<T[]> {
  const ttlMs = options.ttlMs ?? DEFAULT_TTL_MS;
  const now = Date.now();

  if (!options.forceRefresh) {
    const pending = inFlight.get(sheetName);
    if (pending) return pending as Promise<T[]>;

    const mem = memoryCache.get(sheetName) as CacheEntry<T> | undefined;
    if (mem && now - mem.timestamp < ttlMs) return mem.data;

    const local = readLocalCache<T>(sheetName);
    if (local && now - local.timestamp < ttlMs) {
      memoryCache.set(sheetName, local);
      return local.data;
    }
  }

  const fetchPromise = (async () => {
    const response = await fetch(getSheetCSVUrl(sheetName), { cache: 'no-store' });
    if (!response.ok) {
      throw new Error(`Failed to fetch sheet data for ${sheetName}: ${response.status} ${response.statusText}`);
    }

    const data = parseCSV<T>(await response.text());
    const entry: CacheEntry<T> = { data, timestamp: Date.now() };
    memoryCache.set(sheetName, entry);
    writeLocalCache(sheetName, entry);
    return data;
  })();

  inFlight.set(sheetName, fetchPromise);
  try {
    return await fetchPromise;
  } finally {
    inFlight.delete(sheetName);
  }
}

/** Converts a raw cell into a number or boolean where it looks like one. */
function coerce(value: string): string | number | boolean {
  if (value === '') return '';
  if (!isNaN(Number(value))) return Number(value);
  const lower = value.toLowerCase();
  if (lower === 'true') return true;
  if (lower === 'false') return false;
  return value;
}

/**
 * Parses CSV text into objects keyed by the header row.
 * Supports quoted fields containing commas, escaped quotes and line breaks.
 */
function parseCSV<T>(csvText: string): T[] {
  const records: string[][] = [];
  let record: string[] = [];
  let field = '';
  let inQuotes = false;

  const endField = () => {
    record.push(field.trim());
    field = '';
  };
  const endRecord = () => {
    endField();
    if (record.some(Boolean)) records.push(record);
    record = [];
  };

  for (let i = 0; i < csvText.length; i++) {
    const char = csvText[i];

    if (inQuotes) {
      if (char === '"' && csvText[i + 1] === '"') {
        field += '"';
        i++;
      } else if (char === '"') {
        inQuotes = false;
      } else {
        field += char;
      }
    } else if (char === '"') {
      inQuotes = true;
    } else if (char === ',') {
      endField();
    } else if (char === '\n') {
      endRecord();
    } else if (char !== '\r') {
      field += char;
    }
  }
  if (field || record.length) endRecord();

  const [headers, ...rows] = records;
  if (!headers) return [];

  return rows.map((values) => {
    const row: Record<string, string | number | boolean> = {};
    headers.forEach((header, index) => {
      row[header] = coerce(values[index] ?? '');
    });
    return row as T;
  });
}
