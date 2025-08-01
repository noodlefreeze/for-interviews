interface Array<T> {
  myReduce<U>(
    callbackFn: (previousValue: U, currentValue: T, currentIndex: number, array: T[]) => U,
    initialValue?: U
  ): U
}

Array.prototype.myReduce = function <T, U>(
  this: T[],
  callbackFn: (accumulator: U, currentValue: T, currentIndex: number, array: T[]) => U,
  initialValue?: U
): U {
  if (this.length === 0 && initialValue === undefined) {
    throw new TypeError('Reduce of empty array with no initial')
  }

  let i = initialValue === undefined ? 1 : 0
  let result = initialValue === undefined ? (this[0] as unknown as U) : initialValue

  for (; i < this.length; i++) {
    const element = this[i]

    if (element === undefined) continue

    result = callbackFn(result, this[i], i, this)
  }

  return result
}
