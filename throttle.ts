type ThrottleFunction<T extends any[]> = (...args: T) => any

interface ThrottleOptions {
  leading?: boolean
  trailing?: boolean
}

export default function throttle<T extends any[]>(
  func: (...args: T) => any,
  wait: number,
  options: ThrottleOptions = {}
): ((...args: T) => void) & { cancel: () => void } {
  let timeoutId: ReturnType<typeof setTimeout> | null = null
  let lastArgs: T | null = null
  let lastThis: any
  let lastCallTime = 0

  const { leading = true, trailing = true } = options

  function invoke(time: number) {
    lastCallTime = time
    func.apply(lastThis, lastArgs!)
    lastArgs = lastThis = null
  }

  function throttled(this: any, ...args: T) {
    const now = Date.now()

    if (lastCallTime === 0 && !leading) {
      lastCallTime = now
    }

    const remaining = wait - (now - lastCallTime)
    lastArgs = args
    lastThis = this

    if (remaining <= 0 || remaining > wait) {
      if (timeoutId) {
        clearTimeout(timeoutId)
        timeoutId = null
      }
      invoke(now)
    } else if (!timeoutId && trailing) {
      timeoutId = setTimeout(() => {
        timeoutId = null
        if (trailing && lastArgs) {
          invoke(Date.now())
        }
      }, remaining)
    }
  }

  throttled.cancel = () => {
    if (timeoutId) {
      clearTimeout(timeoutId)
      timeoutId = null
    }
    lastArgs = lastThis = null
    lastCallTime = 0
  }

  return throttled
}
