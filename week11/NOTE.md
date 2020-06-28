# 每周总结可以写在这里

## 异步编程：红绿灯问题

一个路口的红绿灯，会按照绿灯亮 10 秒，黄灯亮 2 秒，红灯亮 5 秒的顺序无限循环，用 JS 实现

### 基础设施

```html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Traffic Light</title>
  <style>
    div > div {
      display: inline-block;
      background-color: lightgray;
      width: 100px;
      height: 100px;
      border-radius: 50%;
    }

    .red.light {
      background-color: red;
    }

    .yellow.light {
      background-color: yellow;
    }

    .green.light {
      background-color: green;
    }
  </style>
</head>

<body>
  <div>
    <div class="red"></div>
    <div class="yellow"></div>
    <div class="green"></div>
  </div>
  <script src="./traffic-light-common.js"></script>
</body>

</html>
```

```js
const CLASS_LIGHT = 'light'
const CLASS_RED = 'red'
const CLASS_YELLOW = 'yellow'
const CLASS_GREEN = 'green'

const DURATION_BASE = 1000
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
```

### 版本一：setTimeout

```js
function useSetTimeout() {
  green()
  setTimeout(yellow, DURATION_GREEN)
  setTimeout(red, DURATION_GREEN + DURATION_YELLOW)
  setTimeout(useSetTimeout, DURATION_GREEN + DURATION_YELLOW + DURATION_RED)
}
```

### 版本二：promise

```js
function usePromise() {
  green()
  sleep(DURATION_GREEN)
    .then(() => {
      yellow()
      return sleep(DURATION_YELLOW)
    })
    .then(() => {
      red()
      return sleep(DURATION_RED)
    })
    .then(usePromise)
}
```

### 版本三：async await

无需回调

```js
async function useAsyncAwait() {
  while(true) {
    green()
    await sleep(DURATION_GREEN)
    yellow()
    await sleep(DURATION_YELLOW)
    red()
    await sleep(DURATION_RED)
  }
}
```

### 版本四：手动控制

```js
async function useManual() {
  const BUTTON_NEXT_ID = 'next'

  function addNextButton() {
    const $button = document.createElement('button')
    $button.setAttribute('id', BUTTON_NEXT_ID)
    $button.innerText = 'Next'
    document.body.append($button)
    return $button
  }

  function happen(element, eventName) {
    return new Promise(resolve => {
      element.addEventListener(eventName, resolve, { once: true })
    })
  }

  if (document.getElementById(BUTTON_NEXT_ID)) return
  const $button = addNextButton()
  
  while(true) {
    green()
    await happen($button, 'click')
    yellow() 
    await happen($button, 'click')
    red() 
    await happen($button, 'click')
  }
}
```

### 版本五：generator

```js
function useGenerator() {
  function* main() {
    while (true) {
      green()
      yield sleep(DURATION_GREEN)
      yellow()
      yield sleep(DURATION_YELLOW)
      red()
      yield sleep(DURATION_RED)
    }
  }

  function co(generator) {
    function run(iterator) {
      const { value: promise, done } = iterator.next()
      if (done || !(promise instanceof Promise)) return
      promise.then(() => run(iterator))
    }

    return run(generator())
  }

  co(main)
}
```

## 寻路


