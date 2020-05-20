const EOF = Symbol('EOF')

function data(c) {
  if (c === '<') {
    return tagOpen
  } else if (c === EOF) {
    return 
  } else {
    return data
  }
}

function tagOpen(c) {
  if (c === '/') {
    return endTagOpen
  } else if (c.match(/^[a-zA-Z]&/)) {
    return tagName(c)
  } else {
    return
  }
}

function tagName(c) {
  if (c.match(/^[\t\n\f ]$/)) {
    return beforeAttributeName
  } else if (c === '/') {
    return selfClosingStartTag
  } else if (c.match(/^[a-zA-Z]&/)) {
    return tagName(c)
  } else if (c === '>') {
    return data
  } else {
    return tagName
  }
}

function beforeAttributeName() {

}

function selfClosingStartTag() {
  
}

function parseHTML(html) {
  let state = data
  for (let c of html) {
    state = state(c)
  } 
  state = state(EOF)
}

exports.parseHTML = parseHTML