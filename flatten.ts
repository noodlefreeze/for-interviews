type ArrayValue = any | Array<ArrayValue>

export default function flatten(value: Array<ArrayValue>): Array<any> {
  const result: unknown[] = []

  function flat(value: Array<ArrayValue>) {
    if (Array.isArray(value)) {
      value.forEach(flat)
    } else {
      result.push(value)
    }
  }

  flat(value)

  return result
}
