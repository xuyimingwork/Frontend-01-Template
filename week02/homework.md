# 写一个正则表达式，能匹配所有 number 直接量
- 见标准 11.8.3 Numeric Literals

数字字面量（NumericLiteral）可分为
- 十进制字面量（DecimalLiteral）=> `/^(((0|[1-9]\d*)\.\d*((e|E)(\d+|(\+|-)\d+))*)|(\.\d+((e|E)(\d+|(\+|-)\d+))*)|((0|[1-9]\d*)((e|E)(\d+|(\+|-)\d+))*))$/`
  - 写法
    - DecimalIntegerLiteral . DecimalDigits<sub>opt</sub> ExponentPart<sub>opt</sub> => `/^(0|[1-9]\d*)\.\d*((e|E)(\d+|(\+|-)\d+))*$/`
    - . DecimalDigits ExponentPart<sub>opt</sub> => `/^\.\d+((e|E)(\d+|(\+|-)\d+))*$/`
    - DecimalIntegerLiteral ExponentPart<sub>opt</sub> => `/^(0|[1-9]\d*)((e|E)(\d+|(\+|-)\d+))*$/`
  - 构成块
    - DecimalIntegerLiteral => `/^(0|[1-9]\d*)$/`
      - 写法
        - 0
        - NonZeroDigit DecimalDigits<sub>opt</sub>
      - 构成块
        - NonZeroDigit => `/^([1-9])$/`
        - DecimalDigits => `/^\d+$/`
          - 写法
            - DecimalDigit
            - DecimalDigits DecimalDigit
    - DecimalDigits => `/^\d+$/`
    - ExponentPart `/^(e|E)(\d+|(\+|-)\d+)$/`
      - 写法
        - ExponentIndicator SignedInteger
      - 构成块
        - ExponentIndicator => `/^(e|E)$/`
        - SignedInteger => `/^(\d+|(\+|-)\d+)$/`
          - 写法
            - DecimalDigits
            - + DecimalDigits
            - - DecimalDigits
- 二进制整型字面量（BinaryIntegerLiteral）
- 八进制整型字面量（OctalIntegerLiteral）
- 十六进制整型字面量（HexIntegerLiteral）



# 写一个 UTF8 编码函数

```js
function UTF8_Encoding(string) {
  return encodeURIComponent(string).replace(/%/g,'\\x');
}
```

# 写一个正则表达式，能匹配除了模板字符串外的 string 直接量

- ![](./string-example.png)