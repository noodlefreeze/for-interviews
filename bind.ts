interface Function {
  myBind(this: Function, thisArg: any, ...argArray: any[]): Function
}

Function.prototype.myBind = function (this: Function, thisArg: any, ...argArray: any[]) {
  const originalFn = this

  return function (...args: any[]) {
    const key = Symbol()
    thisArg[key] = originalFn

    const result = thisArg[key](...argArray, ...args)

    delete thisArg[key]

    return result
  }
}
