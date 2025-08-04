export default function textSearch(text: string, query: string): string {
  if (!text) return ''
  if (!query) return text

  const result: string[] = []
  let i = 0
  const queryLen = query.length
  const queryLower = query.toLowerCase()

  while (i <= text.length - queryLen) {
    let count = 0

    while (text.slice(i + count * queryLen, i + (count + 1) * queryLen).toLowerCase() === queryLower) {
      count++
    }

    if (count > 0) {
      const totalLen = count * queryLen
      result.push(`<b>${text.slice(i, i + totalLen)}</b>`)
      i += totalLen
    } else {
      result.push(text[i])
      i++
    }
  }

  if (i < text.length) {
    result.push(text.slice(i))
  }

  return result.join('')
}
