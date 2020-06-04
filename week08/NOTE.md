# 每周总结可以写在这里

本周主要是 CSS 选择器与排版方面的知识。

## CSS 选择器

选择器是由**组合符（combinator）**分隔的一个或多个**简单选择器序列（sequences of simple selectors）**

在标准 [Selectors Level 3](https://www.w3.org/TR/2018/REC-selectors-3-20181106/) 中规定了 3 类组合符，6 类简单选择器。

关于选择器 specificity 的计算，可见个人博文 [实现一个玩具浏览器（五）CSS Computing 生成 Computed 属性 一节](https://blog.xuyimingwork.com/post/2020-05-30/toy-browser-5/#%E7%94%9F%E6%88%90-computed-%E5%B1%9E%E6%80%A7)

另有标准 [Calculating a selector's specificity](https://www.w3.org/TR/2018/REC-selectors-3-20181106/#specificity)

## 排版

排版主要介绍了正常流排版与 flex 排版

## 作业

见：[match.js](./match.js)

亮点
- 能解析选择器各部分（组合符，简单选择器序列，简单选择器）
- 能判断符合选择器

不足
- 未实现属性选择器、伪类选择器、伪元素选择器
- 未实现兄弟选择器
