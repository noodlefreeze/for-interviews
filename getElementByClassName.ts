export default function getElementsByClassName(element: Element, classNames: string): Array<Element> {
  const els: Array<Element> = []
  const classItems = Array.from(new Set(classNames.trim().split(/\s+/)))

  function travel(el: Element) {
    for (const child of el.children) {
      if (classItems.every((name) => child.classList.contains(name))) {
        els.push(child)
      }

      travel(child)
    }
  }

  travel(element)

  return els
}
