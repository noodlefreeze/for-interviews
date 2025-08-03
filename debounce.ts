export default function debounce(func: Function, wait: number): Function {
  let timeoutId: number | undefined
  let lastArgs: unknown[] | undefined
  let lastThis: unknown

  function debounced(this: any, ...args: unknown[]) {
    if (timeoutId !== undefined) {
      clearTimeout(timeoutId)
      timeoutId = undefined
    }

    lastThis = this
    lastArgs = args

    timeoutId = setTimeout(function () {
      func.apply(lastThis, args)
    }, wait)
  }

  debounced.cancel = function () {
    if (timeoutId !== undefined) {
      clearTimeout(timeoutId)
      timeoutId = undefined
    }
    lastArgs = undefined
    lastThis = undefined
  }

  debounced.flush = function () {
    if (timeoutId !== undefined) {
      clearTimeout(timeoutId)
      func.apply(lastThis, lastArgs)
      timeoutId = undefined
      lastArgs = undefined
      lastThis = undefined
    }
  }

  return debounced
}

const increment = debounce(function (this: any, delta: number) {
  this.val += delta
}, 10)

const obj = {
  val: 2,
  increment,
}
obj.increment(3)
