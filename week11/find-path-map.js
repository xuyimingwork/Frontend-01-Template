const map = localStorage.map ? JSON.parse(localStorage.map) : new Array(10000).fill(0)

!function initMap() {
  const $container = document.getElementById('container')

  let mouse = false
  let clear = false
  document.addEventListener('mousedown', e => {
    mouse = true
    clear = e.which === 3
  })
  document.addEventListener('mouseup', () => mouse = false)
  document.addEventListener('contextmenu', e => e.preventDefault())

  map.forEach((item, index) => {
    const $cell = document.createElement('div')
    $cell.classList.add('cell')
    if (map[index]) $cell.style.backgroundColor = "black"
    $cell.addEventListener('mousemove', () => {
      if (!mouse) return
      if (clear) {
        $cell.style.backgroundColor = ''
        map[index] = 0
      } else {
        $cell.style.backgroundColor = "black"
        map[index] = 1
      }
    })
    $container.appendChild($cell)
  })

  const $save = document.createElement('button')
  $save.innerText = 'Save'
  $save.addEventListener('click', () => localStorage.map = JSON.stringify(map))
  $container.after($save)

  const $clear = document.createElement('button')
  $clear.innerText = 'Clear'
  $clear.addEventListener('click', () => delete localStorage.map)
  $save.after($clear)
}()