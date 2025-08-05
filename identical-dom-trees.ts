export default function identicalDOMTrees(nodeA: Node, nodeB: Node): boolean {
  // 类型不同
  if (nodeA.nodeType !== nodeB.nodeType) return false

  // 文本节点
  if (nodeA.nodeType === Node.TEXT_NODE) {
    return nodeA.textContent === nodeB.textContent
  }

  // 元素节点
  if (nodeA.nodeType === Node.ELEMENT_NODE) {
    const elA = nodeA as Element
    const elB = nodeB as Element

    // 标签名不同
    if (elA.tagName !== elB.tagName) return false

    // 属性数量不同
    if (elA.attributes.length !== elB.attributes.length) return false

    // 每个属性都要匹配
    for (let i = 0; i < elA.attributes.length; i++) {
      const attrA = elA.attributes[i]
      const attrB = elB.getAttribute(attrA.name)
      if (attrB !== attrA.value) return false
    }

    // 子节点数量不同
    if (elA.childNodes.length !== elB.childNodes.length) return false

    // 递归比较每一个子节点
    for (let i = 0; i < elA.childNodes.length; i++) {
      if (!identicalDOMTrees(elA.childNodes[i], elB.childNodes[i])) {
        return false
      }
    }

    return true
  }

  return false
}
