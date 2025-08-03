export type ClassValue = ClassArray | ClassDictionary | string | number | null | boolean | undefined
export type ClassDictionary = Record<string, unknown>
export type ClassArray = Array<ClassValue>

export default function classNames(...args: Array<ClassValue>): string {
  if (args.length === 0) return ''

  const result: Set<string> = new Set()

  function travel(classes: ClassValue) {
    if (!classes) return

    if (Array.isArray(classes)) {
      classes.forEach(travel)
    } else if (typeof classes === 'object') {
      for (const [key, value] of Object.entries(classes)) {
        if (value) result.add(key)
      }
    } else if (typeof classes === 'string' || typeof classes === 'number') {
      result.add(String(classes))
    }
  }

  args.forEach(travel)

  return Array.from(result).join(' ')
}
