function create(Cls, attributes, ...children) {
  let o = new Cls({
    a: 'mmm'
  });

  for (let name in attributes) {
    o.setAttribute(name, attributes[name])
  }

  for (let child of children) {
    o.appendChild(child)
  }

  return o
}

class Div {
  constructor(config) {
    this.children = []
    this.root = document.createElement('div')
  }

  setAttribute(name, value) {
    this.root.setAttribute(name, value)
  }

  appendChild(child) {
    this.children.push(child)
  }

  mountTo(parent) {
    parent.appendChild(this.root)
    for (let child of this.children) {
      child.mountTo(this.root)
    }
  }
}

let component = <Div id="a" class="b" style="width: 100px; height: 100px; background-color: lightblue;">
  <Div></Div>
  <Div></Div>
  <Div></Div>
</Div>

component.mountTo(document.body)