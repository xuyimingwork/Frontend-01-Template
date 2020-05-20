# 每周总结可以写在这里

## 有限状态机（[Finite-State Machine, FSM](https://zh.wikipedia.org/wiki/%E6%9C%89%E9%99%90%E7%8A%B6%E6%80%81%E6%9C%BA)）处理字符串

- 每一个状态都是一个机器
  - 所有的机器接收同样的输入
- 每一个机器都知道下一个状态，分为
  - Moore 型状态机，每个机器都有确定的下一个状态
  - Mealy 型状态机，每个机器依据输入决定下一个状态

## 解析 HTML

- 使用 FSM 解析

> 标准：[解析 HTML 文档](https://html.spec.whatwg.org/multipage/parsing.html)
> 
> 挑选标准中的部分状态实现

- 解析标签

  - 开始标签
  - 结束标签
  - 自封闭标签

- 创建元素，在标签结束时提交标签 token
- 处理属性，把属性添加到标签 token 上
- 使用栈构建 dom 树
- 处理文本节点

## 处理 css

- 收集 css 规则
  - 调用 css parser 解析 css 规则
- 在创建元素后计算当前元素的 css
- 测试 css 规则是否应用于当前元素
  - 获取父元素序列
  - 拆分选择器
  - 计算单个选择器与元素是否匹配
- 将匹配的 css 规则挂载到当前元素上，生成 computed 属性
- 确定 css 规则的覆盖关系（即 css 的 Cascading）

## 作业

尚未完成

### 参考资料

- 
- [https://html.spec.whatwg.org/multipage/parsing.html#tagopen-state](https://html.spec.whatwg.org/multipage/parsing.html#tagopen-state)
- [https://html.spec.whatwg.org/multipage/parsing.html#parsing-main-inselect](https://html.spec.whatwg.org/multipage/parsing.html#parsing-main-inselect)