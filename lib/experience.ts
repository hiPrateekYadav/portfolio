// Career start: July 2022 (month is 0-based)
const CAREER_START = { year: 2022, month: 6 }

/**
 * Formats total experience since CAREER_START in half-year steps:
 * exact years → "2 years", exact half → "4.5 years", otherwise rounded down with "+"
 * (3y 2m → "3+ years", 2y 8m → "2.5+ years").
 */
export function formatExperience(now: Date = new Date()): string {
  const months = Math.max(0, (now.getFullYear() - CAREER_START.year) * 12 + now.getMonth() - CAREER_START.month)
  const halfYears = Math.floor(months / 6)
  const value = halfYears / 2
  const plus = months % 6 === 0 ? '' : '+'
  return `${value}${plus} ${value === 1 && !plus ? 'year' : 'years'}`
}
