

function enableGesture(element) {

  const contexts = Object.create(null);
  const MOUSE_SYMBOL = Symbol('mouse');

  if (window.ontouchstart !== null)
    element.addEventListener('mousedown', event => {
      contexts[MOUSE_SYMBOL] = Object.create(null)
      start(event, contexts[MOUSE_SYMBOL])

      let mousemove = event => {
        move(event, contexts[MOUSE_SYMBOL])
      }

      let mouseend = event => {
        end(event, contexts[MOUSE_SYMBOL])
        document.removeEventListener('mousemove', mousemove)
        document.removeEventListener('mouseup', mouseend)
      }

      document.addEventListener('mousemove', mousemove)
      document.addEventListener('mouseup', mouseend)
    })

  element.addEventListener('touchstart', event => {
    for (let touch of event.changedTouches) {
      contexts[touch.identifier] = Object.create(null)
      start(touch, contexts[touch.identifier])
    }
  })

  element.addEventListener('touchmove', event => {
    for (let touch of event.changedTouches) {
      move(touch, contexts[touch.identifier])
    }
  })

  element.addEventListener('touchend', event => {
    for (let touch of event.changedTouches) {
      end(touch, contexts[touch.identifier])
      delete contexts[touch.identifier]
    }
  })

  element.addEventListener('touchcancel', event => {
    for (let touch of event.changedTouches) {
      cancel(touch, contexts[touch.identifier])
      delete contexts[touch.identifier]
    }
  })

  // tap 轻触
  // pan 移动
  // flick 快速移动
  // press 长按 - pressstart pressend

  let start = (point, context) => {
    element.dispatchEvent(new CustomEvent('start', {

    }))
    context.startX = point.clientX;
    context.startY = point.clientY;
    context.moves = [];
    context.isTap = true;
    context.isPan = false;
    context.isPress = false;
    context.timeoutHandler = setTimeout(() => {
      if (context.isPan) return;
      context.isTap = false;
      context.isPan = false;
      context.isPress = true;
      element.dispatchEvent(new CustomEvent(''))
      console.log('press start')
    }, 500)
  }

  let move = (point, context) => {
    let dx = point.clientX - context.startX;
    let dy = point.clientY - context.startY;

    let distance = dx ** 2 + dy ** 2
    if (distance > 100 && !context.isPan) {
      if (context.isPress) console.log('press cancel')
      context.isTap = false;
      context.isPan = true;
      context.isPress = false;
      console.log('pan start')
    }

    if (context.isPan) {
      console.log('pan')
      context.moves.push({
        dx, dy,
        t: Date.now()
      })
      context.moves = context.moves.filter(record => Date.now() - record.t < 300)
    }
  }

  let end = (point, context) => {
    if (context.isPan) {
      const last = context.moves[0]
      let dx = point.clientX - context.startX;
      let dy = point.clientY - context.startY;
      const speed = Math.sqrt((last.dx - dx) ** 2 + (last.dy - dy) ** 2) / (Date.now() - last.t)

      const isFlick = speed > 2.5
      if (isFlick) console.log('flick')
      console.log('pan end')
    }
    if (context.isTap) {
      console.log('tap')
      element.dispatchEvent(new CustomEvent('tap', {}))
    }
    if (context.isPress) console.log('press end')

    clearTimeout(context.timeoutHandler)
  }

  let cancel = (point, context) => {
    console.log('cancel')
    clearTimeout(context.timeoutHandler)
  }

}
