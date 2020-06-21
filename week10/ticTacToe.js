const MAP = { 0: '', 1: '⭕', 2: '❌' }

let pattern = [
  [2, 0, 0],
  [0, 1, 0],
  [0, 0, 0],
]

let color = 1

function show(data) {
  const $app = document.getElementById('app')
  $app.innerHTML = ''
  for(let rowIndex in data) {
    for (let columnIndex in pattern[rowIndex]) {
      const $item = document.createElement('div')
      $item.innerHTML = MAP[pattern[rowIndex][columnIndex]]
      $item.addEventListener('click', () => move(rowIndex, columnIndex))
      $app.appendChild($item)
    }
  }
}

function move(rowIndex, columnIndex) {
  const item = pattern[rowIndex][columnIndex]
  if (MAP[item]) return
  pattern[rowIndex][columnIndex] = color
  color = 3 - color
  show(pattern)
}

function check(pattern, color) {
  for (let rowIndex = 0; rowIndex < 3; rowIndex++) {
    color * 3 === pattern[rowIndex].reduce((total, item) => {
      total += item
      return total
    }, 0)
  }

  
}

show(pattern)