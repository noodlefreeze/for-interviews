interface Array<T> {
  myFilter(callbackFn: (this: T[], value: T, index: number, array: Array<T>) => boolean, thisArg?: any): Array<T>
}

Array.prototype.myFilter = function <T>(
  this: T[],
  callbackFn: (this: T, value: T, index: number, array: T[]) => boolean,
  thisArg?: any
): T[] {
  const result: T[] = []

  for (let i = 0; i < this.length; i++) {
    const element = this[i]

    if (element === undefined) continue
    if (callbackFn.call(thisArg, element, i, this)) {
      result.push(element)
    }
  }

  return result
}
