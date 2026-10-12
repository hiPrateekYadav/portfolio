/** Convert supported cloud share URLs into browser download endpoints. */
export function toDownloadUrl(value: string): string {
  const url = value.trim()
  const driveMatch = url.match(/^https?:\/\/drive\.google\.com\/file\/d\/([^/]+)(?:\/|$)/i)

  if (driveMatch) {
    return `https://drive.usercontent.google.com/download?id=${encodeURIComponent(driveMatch[1])}&export=download&confirm=t`
  }

  return url
}
