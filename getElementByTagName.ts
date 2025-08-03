export default function getElementsByTagName(el: Element, tagName: string): Array<Element> {
  const els: Array<Element> = []

  function travel(el: Element) {
    for (const child of el.children) {
      if (child.tagName === tagName.toUpperCase()) {
        els.push(child)
      }

      travel(child)
    }
  }

  travel(el)

  return els
}
