async function path(map, start, end, useDeepFirst = false) {
  map = map.slice()

  let length = 0
  const collection = [start]
  while (collection.length) {
    const [x, y] = prev = useDeepFirst ? collection.pop() : collection.shift()

    // log
    if (collection.length > length) length = collection.length, console.log(length)

    // 找到
    if (x === end[0] && y === end[1]) {
      console.log(x, y)
      const path = []
      let prevLocation = [x, y]
      while(prevLocation[0] !== start[0] || prevLocation[1] !== start[1]) {
        path.unshift(prevLocation)
        $container.children[getIndex(...prevLocation)].style.backgroundColor = 'lightblue'
        prevLocation = map[getIndex(...prevLocation)]
        await sleep(1)
      }
      return path
    }

    const left = [x - 1, y]
    const right = [x + 1, y]
    const top = [x, y - 1]
    const bottom = [x, y + 1]

    const topLeft = [x - 1, y - 1]
    const topRight = [x + 1, y - 1]
    const bottomRight = [x + 1, y + 1]
    const bottomLeft = [x - 1, y + 1]

    await insert(left, prev)
    await insert(right, prev)
    await insert(top, prev)
    await insert(bottom, prev)
    await insert(topLeft, prev)
    await insert(topRight, prev)
    await insert(bottomRight, prev)
    await insert(bottomLeft, prev)
  }

  return null

  async function insert([x, y], prev) {
    const index = getIndex(x, y)
    if (x < 0 || x > 99 || y < 0 || y > 99) return
    if (map[index] !== 0) return
    map[index] = prev
    $container.children[index].style.backgroundColor = 'lightgreen'
    await sleep(1)
    collection.push([x, y])
  }

  function sleep(time) {
    return new Promise(resolve => {
      setTimeout(resolve, time);
    })
  }
}

function getIndex(x, y) {
  return  100 * y + x
}

