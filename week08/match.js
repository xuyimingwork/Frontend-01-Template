console.log('match result:', match("div > #id.class", document.getElementById("id")))

function match(selector, element) {
  if (typeof selector !== 'string') return false
  if (!(element instanceof Element)) return false

  const parts = parseSelector(selector).reverse()
  const elements = [element].concat(getParents(element))

  let partIndex = 0
  for (element of elements) {
    if (matchSingleElement(parts[partIndex], element)) partIndex++
  }

  if (partIndex >= parts.length) return true
  return false
}

function getParents(element) {
  if (!(element instanceof Element)) throw Error()
  let current = element
  const parents = []
  while(current.parentElement) {
    parents.push(current.parentElement)
    current = current.parentElement
  }
  return parents
}

function matchSingleElement(simpleSelectorSequenceObj, element) {
  if (typeof simpleSelectorSequenceObj !== 'object' || simpleSelectorSequenceObj === null) return false
  if (!(element instanceof Element)) return false

  const { prevCombinator, prevSelector, selector } = simpleSelectorSequenceObj
  if (prevCombinator === '>') {
    return matchSimpleSelectorSequence(prevSelector, element.parentElement)
      && matchSimpleSelectorSequence(selector, element)
  } else if (!prevCombinator || prevCombinator === ' ') {
    return matchSimpleSelectorSequence(selector, element)
  } 

  return false
}

function matchSimpleSelectorSequence(simpleSelectorSequence, element) {
  if (typeof simpleSelectorSequence !== 'string') return false
  if (!(element instanceof Element)) return false

  const simpleSelectors = parseSimpleSelectorSequence(simpleSelectorSequence)
  return simpleSelectors.reduce((result, selector) => {
    if (!result) return false
    const firstChar = selector[0]
    const afterSequence = selector.slice(1)
    if (firstChar === '*') return true
    else if (firstChar === '[') return false  // TODO:
    else if (firstChar === '.') return element.classList.contains(afterSequence)
    else if (firstChar === '#') return element.id === afterSequence
    else if (firstChar === ':') return false  // TODO:
    return selector.toLowerCase() === element.tagName.toLowerCase()
  }, true)
}

function parseSelector(selector) {
  if (typeof selector !== 'string') throw Error()
  selector = selector.trim()
  
  let currentSimpleSelectorSequence = ''
  let currentCombinator = ''
  const tokens = []
  for (char of selector) {
    if (isSelectorCombinatorChar(char)) {
      if (currentCombinator.length === 0) {
        tokens.push(currentSimpleSelectorSequence)
        currentSimpleSelectorSequence = ''
      }
      currentCombinator += char
    } else {
      if (currentCombinator.length !== 0 
        && currentSimpleSelectorSequence.length === 0) {
        if (currentCombinator.trim().length === 0) currentCombinator = ' '
        else if (currentCombinator.trim().length === 1) currentCombinator = currentCombinator.trim()
        else throw Error(currentCombinator)
        tokens.push(currentCombinator)
        currentCombinator = ''
      }
      currentSimpleSelectorSequence += char
    }
  }
  tokens.push(currentSimpleSelectorSequence)
  const result = tokens.reduce((result, token, index) => {
    if (index === 0) {
      result.push({
        selector: token
      })
    } else if (isSelectorCombinatorChar(token)) {
      result.push({
        prevSelector: result[result.length - 1].selector,
        prevCombinator: token,
        selector: ''
      })
    } else {
      result[result.length - 1].selector = token
    }
    return result
  }, [])
  return result
}

function parseSimpleSelectorSequence(simpleSelectorSequence) {
  if (typeof simpleSelectorSequence !== 'string') throw Error()

  let simpleSelector = ''
  const simpleSelectors = []
  const beginNextSimpleSelector = (nextChar) => {
    if (simpleSelector) simpleSelectors.push(simpleSelector)
    simpleSelector = nextChar || ''
  }

  if (simpleSelectorSequence[0] === '*') {
    simpleSelectorSequence = simpleSelectorSequence.slice(1)
    simpleSelectors.push('*')
  }

  for (char of simpleSelectorSequence) {
    if (char === '[') beginNextSimpleSelector(char)
    else if (char === '.') beginNextSimpleSelector(char)
    else if (char === '#') beginNextSimpleSelector(char)
    else if (char === ':') beginNextSimpleSelector(char)
    else {
      simpleSelector += char
    }
  }

  if (simpleSelector) simpleSelectors.push(simpleSelector)

  return simpleSelectors
}

function isSelectorCombinatorChar(char) {
  return isSelectorWhitespace(char) || ['>', '+', '~'].includes(char)
}

function isSelectorWhitespace(char) {
  return ['\u0020', '\u0009', '\u000A', '\u000D', '\u000C'].includes(char)
}