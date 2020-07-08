class CollectionList {
  constructor(data, compare) {
    if (!Array.isArray(data)) throw Error('data need to be an array')
    if (typeof compare !== 'function') throw Error('compare should be a function')

    this.data = data
    this.compare = compare
  }

  take() {
    if (!this.data.length) return
    let targetIndex = 0
    for (let i = 1; i < this.data.length; i++) {
      // 若 i 较小
      if (this.compare(this.data[i], this.data[targetIndex]) < 0) {
        targetIndex = i
      }
    }
    const target = this.data[targetIndex]
    this.data[targetIndex] = this.data[this.data.length - 1]
    this.data[this.data.length - 1] = target
    return this.data.pop()
  }

  push(point) {
    this.data.push(point)
  }

  get length() {
    return this.data.length
  }
}