const CLASS_LIGHT = 'light'
const CLASS_RED = 'red'
const CLASS_YELLOW = 'yellow'
const CLASS_GREEN = 'green'

const DURATION_BASE = 100
const DURATION_RED = 5 * DURATION_BASE
const DURATION_YELLOW = 2 * DURATION_BASE
const DURATION_GREEN = 10 * DURATION_BASE

/**
 * grey all and light pass color
 * @param {String} color color to light
 */
function light(color) {
  // check is valid light color
  if ([CLASS_RED, CLASS_YELLOW, CLASS_GREEN].indexOf(color) < 0) 
    return console.error('invalid light color', color);
  
  // remove prev lighted color
  [...document.getElementsByClassName(CLASS_LIGHT)]
    .forEach($el => $el.classList.remove(CLASS_LIGHT))
  
  // set current light color
  const $light = document.getElementsByClassName(color)[0]
  $light.classList.add(CLASS_LIGHT)
}

function red() {
  light(CLASS_RED)
}

function yellow() {
  light(CLASS_YELLOW)
}

function green() {
  light(CLASS_GREEN)
}

function sleep(time) {
  return new Promise(resolve => {
    setTimeout(resolve, time);
  })
}