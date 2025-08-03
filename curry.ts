type AnyFunction = (this: any, ...args: any[]) => any
type Curried<T> = T extends (this: infer This, ...args: infer Args) => infer R
  ? Args extends [infer A, ...infer Rest]
    ? (this: This, arg: A) => Curried<(this: This, ...args: Rest) => R> & ((this: This, ...args: Args) => R)
    : (this: This) => R
  : never

export default function curry<T extends AnyFunction>(func: T): Curried<T> {
  function curried(this: ThisParameterType<T>, ...args: Parameters<T>): any {
    const self = this

    if (args.length >= func.length) {
      return func.apply(self, args)
    }

    return function (...nextArgs: any[]) {
      return curried.apply(self, [...args, ...nextArgs])
    }
  }

  return curried as Curried<T>
}
