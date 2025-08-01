export default function get<T>(
  objectParam: Record<string, any>,
  pathParam: string | Array<string | number>,
  defaultValue?: T
): T | undefined {
  let result = defaultValue
  let obj = objectParam
  let paths: Array<string | number>

  if (typeof pathParam === 'string') {
    paths = pathParam.split('.')
  } else {
    paths = pathParam
  }

  for (let i = 0; i < paths.length; i++) {
    const path = paths[i]

    if (typeof obj === 'object' && obj !== null && obj[path] !== undefined) {
      result = obj[path]
      obj = obj[path]
    } else {
      return defaultValue
    }
  }

  return result
}
