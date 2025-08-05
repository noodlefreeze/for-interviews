import jsdom from 'jsdom'
const { JSDOM } = jsdom

const html = `<body>
  <h1>标题一</h1>
  <h2>子标题一</h2>
  <h2>子标题二</h2>
  <h3>孙标题</h3>
</body>`

const dom = new JSDOM(html)

export default function tableOfContents(doc: Document): string {
  const headingTags = Array.from(doc.body.querySelectorAll('h1, h2, h3, h4, h5, h6'))

  type TOCItem = {
    level: number
    text: string
    children: TOCItem[]
  }

  const root: TOCItem = { level: 0, text: '', children: [] }
  const stack: TOCItem[] = [root]

  headingTags.forEach((tag) => {
    const level = parseInt(tag.tagName.slice(1))
    const text = tag.textContent?.trim() || ''
    const newItem: TOCItem = { level, text, children: [] }

    while (stack.length > 0 && stack[stack.length - 1].level >= level) {
      stack.pop()
    }

    stack[stack.length - 1].children.push(newItem)
    stack.push(newItem)
  })

  function render(items: TOCItem[]): string {
    if (items.length === 0) return ''
    return `<ul>${items.map((item) => `<li>${item.text}${render(item.children)}</li>`).join('')}</ul>`
  }

  return render(root.children)
}

tableOfContents(dom.window.document)
