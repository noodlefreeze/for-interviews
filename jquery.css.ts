interface JQuery {
  css: (prop: string, value?: boolean | string | number) => JQuery | string | undefined
}

export default function $(this: JQuery, selector: string): JQuery {
  const element = document.querySelector<HTMLElement>(selector)

  const self = {} as JQuery

  self.css = function (prop: string, value?: boolean | string | number) {
    if (value === undefined) {
      if (!element) return undefined
      const v = element.style.getPropertyValue(prop)
      return v === '' ? undefined : v
    }

    if (!element) return self

    element.style[prop] = value.toString()

    return this
  }

  return self
}
