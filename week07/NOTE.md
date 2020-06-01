# 每周总结可以写在这里

## toy-browser

博文的排版与渲染还未完成，
项目的代码已可以运行。

相关链接：

[博文：实现一个玩具浏览器](https://blog.xuyimingwork.com/tag/%E5%AE%9E%E7%8E%B0%E4%B8%80%E4%B8%AA%E7%8E%A9%E5%85%B7%E6%B5%8F%E8%A7%88%E5%99%A8/)
[项目：toy-browser](https://github.com/xuyimingwork/toy-browser)

## CSS 知识框架

- @rule
  - @charset
  - @import
  - @namespace
  嵌套 @rule
  - @media
  - @supports
  - @document
  - @page
  - @font-face
  - @keyframes
  - @viewport
  - @counter-style
  - @font-feature-values
- rule
  - 选择器
    - 选择器分组 `,`
    - 简单选择器
      - 类型选择器
      - 通用选择器
      - 属性选择器
      - 类选择器
      - ID选择器
      - 伪类选择器
        - 动态伪类选择器
        - 目标伪类选择器
        - 语言伪类选择器
        - UI 元素状态伪类选择器
        - 结构型伪类选择器
        - 非伪类选择器
    - 伪元素选择器
    - 符合选择器
      - 子孙 ` `
      - 子 `>`
      - 兄弟 
        - 下一节点 `+`
        - 手续任意 `~`
  > 选择器参见：[Selectors Level 3](https://www.w3.org/TR/2018/REC-selectors-3-20181106/)
  - 声明
    - 属性名
      - property
      - variable
    - 属性值

### 收集标准

地址：[All Standards and Drafts](https://www.w3.org/TR/)

```js
JSON.stringify([...document.querySelector('#container').children]
  .filter(el => el.dataset.tag.includes('css'))
  .map(el => ({
    name: el.children[1].innerText,
    url: el.children[1].children[0].href,
  })), null, 2)
```

### 

```js
function happen(element, event) {
  return new Promise((resolve) => {
    const handler = () => {
      resolve()
      element.removeEventListener(event, handler)
    }
    element.addEventListener(event, handler)
  })
}

let iframe = document.createElement("iframe");
document.body.innerText = ""
document.body.appendChild(iframe)

(async function() {
  for (let standard of standards) {
    iframe.src = standard.url
    console.log(standard.name)
    await happen(iframe, 'load')
  }
})()
```