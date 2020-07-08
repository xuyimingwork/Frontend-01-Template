class CollectionBinaryHeap {
  constructor(data, compare) {
    if (!Array.isArray(data)) throw Error('data need to be an array')
    if (typeof compare !== 'function') throw Error('compare should be a function')

    this.data = []
    this.compare = compare

    data.forEach(point => this.push(point))
  }

  take() {
    if (!this.data.length) return

    // 取走最小的节点
    const min = this.data[0]
    
    // 修补二叉树
    let i = 0
    while(i < this.data.length) {
      const leftChildIndex = i * 2 + 1
      const rightChildIndex = i * 2 + 2

      if (leftChildIndex >= this.data.length) break;
      if (rightChildIndex >= this.data.length) {
        this.data[i] = this.data[leftChildIndex]
        i = leftChildIndex
        break
      }

      if (this.compare(this.data[leftChildIndex], this.data[rightChildIndex]) < 0) {
        // 左边子节点更小
        this.data[i] = this.data[leftChildIndex]
        i = leftChildIndex
      } else {
        this.data[i] = this.data[rightChildIndex]
        i = rightChildIndex
      }
    }

    const lastPoint = this.data.pop()
    if (i < this.data.length) this.pushAt(i, lastPoint)

    return min
  }

  pushAt(i, point) {
    this.data[i] = point

    let child = i
    let parent = Math.floor((i - 1) / 2)
    // 若插入值小于其父节点值，冒泡
    while(parent >= 0 && this.compare(point, this.data[parent]) < 0) {
      this.data[child] = this.data[parent]
      this.data[parent] = point
      child = parent
      parent = Math.floor((parent - 1) / 2)
    }
  }

  push(point) {
    this.pushAt(this.data.length, point)
  }

  get length() {
    return this.data.length
  }
}