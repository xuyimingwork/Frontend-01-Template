# 每周总结可以写在这里

## 组件化 | 为组件添加JSX语法

这节主要是涉及 JSX 语法相关内容，如何实现一个 `React.ceateElement`，大课中只是比较浅的介绍了一下。小课继续拓展到实现一个玩具 React。

下面是如何实现一个玩具 React 的系列博文，本节的内容主要是系列博文的前两篇搭建环境与渲染

- [实现一个玩具 React（一）搭建环境](https://blog.xuyimingwork.com/post/2020-07-25/toy-react/)
- [实现一个玩具 React（二）渲染](https://blog.xuyimingwork.com/post/2020-07-26/toy-react-2/)

代码

- [实现一个玩具 React](https://github.com/xuyimingwork/toy-react)

这里我和课程中实现并不一致，没有去拆分 ElementWrapper 与 TextWrapper 等。而是直接使用真实节点作为 React.createElement 的结果返回，更为直接。

## 组件化 | 轮播组件

- [地址](./carousel/)