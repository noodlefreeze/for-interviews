export default function promiseAll<T extends readonly unknown[] | []>(
  iterable: T
): Promise<{ -readonly [P in keyof T]: Awaited<T[P]> }> {
  return new Promise((resolve, reject) => {
    if (iterable.length === 0) {
      resolve([] as { -readonly [P in keyof T]: Awaited<T[P]> })
      return
    }

    const results = new Array(iterable.length)
    let completedCount = 0

    iterable.forEach((item, index) => {
      Promise.resolve(item)
        .then((value) => {
          results[index] = value
          completedCount++
          
          if (completedCount === iterable.length) {
            resolve(results as { -readonly [P in keyof T]: Awaited<T[P]> })
          }
        })
        .catch(reject)
    })
  })
}
