# 每周总结可以写在这里

JavaScript
- Atom
- Expression
- Statement
- Structure
- Program/Module

### 前置

Unicode code point

Unicode 字符集
code point 码点 => 正整数

初始字符集 ASCII

Unicode 不同划分方式

- 分为不同的 Blocks
  - 一段时间标准化的一块字符
  - BMP 基本字符平面 => U+0000 - U+FFFF

- 分为不同的 category
  - space

JavaScript 中从码点到字符 
- [String.fromCharCode()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/fromCharCode)
  - 仅支持 BMP
- [String.fromCodePoint()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/fromCodePoint)
  - 支持所有

JavaScript 中从字符到码点
- [charCodeAt()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/charCodeAt)
  - 仅支持 BMP
- [codePointAt()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/codePointAt)
  - 支持所有

JavaScript 支持 Unicode 编码，但是最佳实践不建议在文件中使用超出 ASCII 外的字符，因为会涉及到文件本身编码保存的问题。

### 正文

ECMAScript Script 或 Module 的源码首先会转为一系列 input elements，分别为：
- white space
  - `<TAB>` CHARACTER TABULATION
  - `<VT>` LINE TABULATION 
  - `<FF>` FORM FEED
  - `<SP>` SPACE
  - `<NBSP>` NO-BREAK SPACE 不“断”空格
  - `<ZWNBSP>` ZERO WIDTH NO-BREAK SPACE 零宽空格
  - `<USP>` 任何其他 Unicode “Space_Separator” 的码点
- line terminators
- comments
- tokens
  - Punctuator 符号，如 `=` 等
  - IdentifierName
    - Keyword
    - Identifier
    - Future reserved keyword => 仅剩 enum
  - Literal
    - Boolean
    - Number
      - IEEE 754 Double Float
      - 不同进制表示法
    - String
      - Chatact
      - Code point
      - Encoding
    - Undefined
    - Null
    - Object
    - Symbol




