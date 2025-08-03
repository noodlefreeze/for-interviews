export default function listFormat(
  items: Array<string>,
  options?: { sorted?: boolean; length?: number; unique?: boolean }
): string {
  let filtered = items.filter(Boolean)
  const { unique, length, sorted } = options ?? {}

  if (unique) {
    filtered = Array.from(new Set(filtered))
  }
  if (sorted) {
    filtered.sort((a, b) => a.localeCompare(b))
  }

  if (filtered.length <= 2) {
    return filtered.join(' and ')
  }

  const visibleItems = filtered.slice(0, length !== undefined && length > 0 ? length : filtered.length)
  const othersCount = filtered.length - visibleItems.length

  let result: string = ''
  if (othersCount <= 0) {
    result = visibleItems.slice(0, -1).join(', ') + ` and ${visibleItems[visibleItems.length - 1]}`
  } else {
    result = visibleItems.join(', ') + ` and ${othersCount} other${othersCount > 1 ? 's' : ''}`
  }

  return result
}
