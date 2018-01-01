import { castArray } from 'lodash'

const uncapitalize = s => /^([A-Z\d]+)$/.test(s)
  ? s.toLowerCase()
  : `${s.substring(0, 1).toLowerCase()}${s.substring(1)}`

const xmlNodeToJson = node =>
  (!node.children || node.children.length === 0)
    && (!node.attributes || node.attributes.length === 0)
    ? node.textContent || null
    : [
      ...Array.from(node.children || []),
      ...Array.from(node.attributes || []),
      ]
        .reduce((result, child) => {
          const nodeName = uncapitalize(child.nodeName)
          const value = xmlNodeToJson(child)

          return {
            ...result,
            [nodeName]: result[nodeName]
              ? [...castArray(result[nodeName]), value]
              : value
          }
        }, {})

export default xmlNodeToJson