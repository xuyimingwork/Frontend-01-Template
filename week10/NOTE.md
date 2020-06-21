# 每周总结可以写在这里

## API

### DOM

用于操作文档片段的 Range API

### CSSOM

document.styleSheets

getComputedStyle

### CSSOM views

窗口API

- moveBy(x, y)
- mobeTo(x, y)
- resizeBy(x, y)
- resizeTo(x, y)
- window.open

视口滚动API

- window.scrollX
- window.scrollY
- window.scroll(x, y)
- window.scrollBy(x, y)

元素滚动API
- element.scrollLeft
- element.scrollTop
- element.scrollWidth
- element.scrollHeight
- element.scrollBy(x, y)
- element.scrollTo(x, y)
- element.scrollIntoView(arg)

布局API
- window.innerHeight
- window.innerWidth
- window.outerHeight
- window.outerWidth
- window.devicePixelRatio
- window.screen

元素布局信息

- element.getClientRects
  返回列表，包含元素对应的每一个盒占据的矩形区域

- element.getBoundingClientRects
  返回元素对应的所有盒的包裹的矩形区域
  >注意，这个 API 获取的区域会包括当 overflow 为 visible 时的子元素区域。

## 三子棋

代码见：

- [HTML](./index.html)
- [JavaScript](./ticTacToe.js)