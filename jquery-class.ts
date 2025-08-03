interface JQuery {
  toggleClass: (className: string, state?: boolean) => JQuery
  addClass: (className: string) => JQuery
  removeClass: (className: string) => JQuery
}

function cns(className: string) {
  return new Set(className.trim().split(/\s+/))
}

export default function $(selector: string): JQuery {
  const element = document.querySelector(selector) as HTMLElement

  return {
    toggleClass: function (className: string, state?: boolean): JQuery {
      const classes = cns(className)
      const elementClasses = cns(element.className)

      classes.forEach((cls) => {
        const shouldRemove = state === undefined ? elementClasses.has(cls) : !state

        if (shouldRemove) {
          elementClasses.delete(cls)
        } else {
          elementClasses.add(cls)
        }
      })

      element.className = Array.from(elementClasses.values()).join(' ')

      return this
    },
    addClass: function (className: string): JQuery {
      this.toggleClass(className, true)

      return this
    },
    removeClass: function (className): JQuery {
      this.toggleClass(className, false)

      return this
    },
  }
}
