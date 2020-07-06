async function path(map, start, end, useDeepFirst = false) {
  // set params
  if (!Array.isArray(map)) throw Error('invalid map')
  if (!Array.isArray(start) || start.length !== 2) throw Error('invalid start point')
  if (!Array.isArray(end) || end.length !== 2) throw Error('invalid end point')
  if (typeof useDeepFirst !== "boolean") useDeepFirst = !!useDeepFirst

  // copy map
  map = map.slice()

  /**
   * 1. 从集合获取当前节点
   * - 若当前节点是终点，计算路径并返回
   * - 若当前节点不是终点，向集合中插入可行的下一节点
   * 2. 遍历集合，直至集合为空
   */
  const collection = [start]
  while (collection.length) {
    /**
     * pop 为深度优先搜索，先解析最后进入集合的节点
     * shift 为广度优先搜索，先解析先进入集合的节点
     */ 
    const [x, y] = current = useDeepFirst ? collection.pop() : collection.shift()

    // 若找到最后一个节点，计算经过路径并返回
    if (x === end[0] && y === end[1]) {
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

    // 插入可能的下一节点
    const left = [x - 1, y]
    const right = [x + 1, y]
    const top = [x, y - 1]
    const bottom = [x, y + 1]
    const topLeft = [x - 1, y - 1]
    const topRight = [x + 1, y - 1]
    const bottomRight = [x + 1, y + 1]
    const bottomLeft = [x - 1, y + 1]

    await insert(left, current)
    await insert(right, current)
    await insert(top, current)
    await insert(bottom, current)
    await insert(topLeft, current)
    await insert(topRight, current)
    await insert(bottomRight, current)
    await insert(bottomLeft, current)
  }

  return null

  // 定义辅助函数
  async function insert(next, current) {
    const [x, y] = next
    const index = getIndex(x, y)
    if (x < 0 || x > 99 || y < 0 || y > 99) return
    if (map[index] !== 0) return
    map[index] = current
    $container.children[index].style.backgroundColor = 'lightgreen'
    await sleep(1)
    collection.push([x, y])
  }

  function sleep(time) {
    return new Promise(resolve => {
      setTimeout(resolve, time);
    })
  }

  function getIndex(x, y) {
    return  100 * y + x
  }
}