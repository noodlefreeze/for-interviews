export default function promiseAny<T>(iterable: Iterable<T>): Promise<T> {
  return new Promise((resolve, reject) => {
    const items = Array.from(iterable)
    if (items.length === 0) {
      reject(new AggregateError([], 'All promises were rejected'))
    }

    let hasDone = false
    const errors: unknown[] = new Array(items.length)
    let caughtCount = 0

    items.forEach((item, index) => {
      Promise.resolve(item)
        .then((value) => {
          if (!hasDone) {
            hasDone = true
            resolve(value)
          }
        })
        .catch((error) => {
          if (hasDone) return

          errors[index] = error
          caughtCount++

          if (caughtCount === items.length) {
            hasDone = true
            reject(new AggregateError(errors, 'All promises were rejected'))
          }
        })
    })
  })
}
