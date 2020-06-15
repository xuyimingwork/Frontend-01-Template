const properties = [...getComputedStyle(document.body)].filter(property => !property.startsWith('-webkit'))

let categories = {
  others: []
}

properties.forEach(property => {
  let category = 'others'
  if (property.includes('-')) {
    category = property.slice(0, property.indexOf('-'))
    if (!categories[category]) categories[category] = []
  }
  categories[category].push(property)
})

Object.keys(categories).forEach(key => {
  if (categories[key].length !== 1) return 
  categories.others = categories.others.concat(...categories[key])
  delete categories[key]
})

const words = properties.reduce((words, property) => {
  property.split('-').forEach(word => {
    if (!(word in words)) words[word] = 0
    words[word]++
  })
  return words
}, {})

const orderWords = Object.keys(words).sort((a, b) => words[b] - words[a])
