let object = {
  a: 1,
  b: 2
}

function reactive(obj) {
  return new Proxy(obj, {
    get(obj, prop) {
      usedReactivities.push([obj, prop])
      return obj[prop]
    },
    set(obj, prop, val) {
      obj[prop] = val
      if (handlers.get(obj) && handlers.get(obj).get(prop)) {
        for (handler of handlers.get(obj).get(prop)) {
          handler()
        }
      }
      return obj[prop]
    }
  })
}

const handlers = new Map()
let usedReactivities = []

function effect(handler) {
  usedReactivities = []
  handler()
  for (let usedReactivity of usedReactivities) {
    const [obj, prop] = usedReactivity
    console.log([obj, prop])
    if (!handlers.has(obj)) handlers.set(obj, new Map())
    if (!handlers.get(obj).has(prop)) handlers.get(obj).set(prop, [])
    handlers.get(obj).get(prop).push(handler)
  }
}

let v1, v2, v12;
let p1 = reactive({a: 1})
let p2 = reactive({a: 2})

effect(() => v12 = p1.a + p2.a)
effect(() => v1 = p1.a)
effect(() => v2 = p2.a)
console.log('dummy', v1, v2, v12)

p1.a = 2
console.log('dummy', v1, v2, v12)

p2.a = 4
console.log('dummy', v1, v2, v12)