class Carousel {
  constructor() {
    this.root = null
    this.data = null
  }

  render() {
    this.root = document.createElement('div')
    this.root.classList.add('carousel')

    for (let d of this.data) {
      let element = document.createElement('img')
      element.src = d
      element.addEventListener('dragstart', event => event.preventDefault())
      this.root.appendChild(element)
    }

    let position = 0
    const nextImage = () => {
      let nextPosition = (position + 1) % this.data.length

      let current = this.root.childNodes[position];
      let next = this.root.childNodes[nextPosition];

      current.style.transition = "ease 0s"
      next.style.transition = "ease 0s"

      current.style.transform = `translateX(${-100 * position}%)`
      next.style.transform = `translateX(${100 -100 * nextPosition}%)`

      setTimeout(() => {
        current.style.transition = "ease 0.5s"
        next.style.transition = "ease 0.5s"

        current.style.transform = `translateX(${-100 -100 * position}%)`
        next.style.transform = `translateX(${-100 * nextPosition}%)`

        position = nextPosition
      }, 16);
      
      setTimeout(nextImage, 3000)
    }

    // nextImage()

    this.root.addEventListener('mousedown', event => {
      let startX = event.clientX
      let startY = event.clientY

      let lastPosition = (position - 1 + this.data.length) % this.data.length
      let nextPosition = (position + 1) % this.data.length

      let current = this.root.childNodes[position];
      let last = this.root.childNodes[lastPosition];
      let next = this.root.childNodes[nextPosition];

      current.style.transition = "ease 0s"
      last.style.transition = "ease 0s"
      next.style.transition = "ease 0s"

      current.style.transform = `translateX(${-100 * position}%)`
      last.style.transform = `translateX(${-100 -100 * lastPosition}%)`
      next.style.transform = `translateX(${100 -100 * nextPosition}%)`

      let move = event => {
        current.style.transform = `translateX(calc(${event.clientX - startX}px + ${-100 * position}%))`
        last.style.transform = `translateX(calc(${event.clientX - startX}px + ${-100 -100 * lastPosition}%))`
        next.style.transform = `translateX(calc(${event.clientX - startX}px + ${100 -100 * nextPosition}%))`
      };
      let up = event => {
        let offset = 0

        if (event.clientX - startX > 250) {
          offset = 1
        } else if (event.clientX - startX < -250) {
          offset = -1
        }

        current.style.transition = "ease 0.5s"
        last.style.transition = "ease 0.5s"
        next.style.transition = "ease 0.5s"

        current.style.transform = `translateX(${offset * 100 - 100 * position}%)`
        last.style.transform = `translateX(${offset * 100 - 100 - 100 * lastPosition}%)`
        next.style.transform = `translateX(${offset * 100 + 100 - 100 * nextPosition}%)`

        position = (position - offset + this.data.length) % this.data.length

        document.removeEventListener("mousemove", move);
        document.removeEventListener("mouseup", up);
      };
      document.addEventListener("mousemove", move);
      document.addEventListener("mouseup", up);
    })
  }
}