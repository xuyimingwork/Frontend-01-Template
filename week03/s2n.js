function convertStringToNumber(string) {
  const decimalLiteralRegExp = /^(((0|[1-9]\d*)\.\d*((e|E)(\+|\-){0,1}\d+)*)|(\.\d+((e|E)(\+|\-){0,1}\d+)*)|((0|[1-9]\d*)((e|E)(\+|\-){0,1}\d+)*))$/;
  const binaryIntegerLiteralRegExp = /^0(b|B)(0|1)+$/;
  const octalIntegerLiteralRegExp = /^0(o|O)[0-7]+$/;
  const hexIntegerLiteralRegExp = /^0(x|X)[0-9a-fA-F]+$/;

  if (typeof string !== 'string') throw new Error('本方法仅支持传入字符串')
  if (decimalLiteralRegExp.test(string)) return convertStringToNumberDecimal(string)
  if (binaryIntegerLiteralRegExp.test(string)) return convertStringToNumberBinary(string)
  if (octalIntegerLiteralRegExp.test(string)) return convertStringToNumberOctal(string)
  if (hexIntegerLiteralRegExp.test(string)) return convertStringToNumberHex(string)
  throw new Error(`当前字符串 ${string} 不是合法数字字面量`)
}

function convertStringToNumberDecimal(string) {
  let integer = 0;
  if (string.includes('.')) integer = _parseInt(string.substring(0, string.indexOf('.')))
  else if (_hasExponentPart(string)) integer = parseInt(_removeExponentPart(string))

  const fraction = _parseFraction(string);
  
  return _withExponent(integer + fraction, string)
}

function convertStringToNumberBinary(string) {
  return _parseInt(_trimRadixSign(string), 2)
}

function convertStringToNumberOctal(string) {
  return _parseInt(_trimRadixSign(string), 8)
}

function convertStringToNumberHex(string) {
  return _parseInt(_trimRadixSign(string), 16)
}

function _trimRadixSign(string) {
  return string.substring(2)
}

function _numberAt(char) {
  const CODE_POINT_ZERO = '0'.codePointAt(0)
  const CODE_POINT_A = 'A'.codePointAt(0)
  const charCodePoint = char.toUpperCase().codePointAt(0)
  if (charCodePoint - CODE_POINT_ZERO >= 0 && charCodePoint - CODE_POINT_ZERO < 10) return charCodePoint - CODE_POINT_ZERO
  if (charCodePoint - CODE_POINT_A >= 0 && charCodePoint - CODE_POINT_A < 6) return 10 + (charCodePoint - CODE_POINT_A)
  throw new Error(`无法将 ${char} 转换为数字`)
}

function _parseInt(string, radix = 10) {
  const chars = string.split('');
  let number = 0;
  for (let i = 0; i < chars.length; i++) {
    number = number * radix;
    number += _numberAt(chars[i]);
  }
  return number
}

function _parseFraction(string) {
  const RADIX = 10;

  if (!string.includes('.')) return 0
  string = string.substring(string.indexOf('.') + 1)
  string = _removeExponentPart(string)

  let baseFraction = 1;
  for (let i = 0; i < string.length; i++) baseFraction = baseFraction * RADIX;

  return _parseInt(string) / baseFraction
}

/**
 * 注：仍存在精度问题
 * 
 * @param {Number} number 
 * @param {String} string 
 */
function _withExponent(number, string) {
  if (!_hasExponentPart(string)) return number
  string = _getExponentPart(string).substring(1)
  if (string.startsWith('-')) {
    return number / _getAbsExponent(string)
  } else {
    return number * _getAbsExponent(string)
  }
}

function _hasExponentPart(string) {
  return string.includes('e') || string.includes('E')
}

function _getExponentPart(string) {
  if (!_hasExponentPart(string)) return ''
  let result = ''

  !['e', 'E'].forEach(exponentIndicator => {
    if (!string.includes(exponentIndicator)) return
    result = string.substring(string.indexOf(exponentIndicator))
  })

  return result
}

function _getAbsExponent(string) {
  if (string.startsWith('-') || string.startsWith('+')) {
    string = string.substring(1)
  } 
  return _pow(10, _parseInt(string))
}

function _pow(x, y) {
  if (y === 0 || x === 1) return 1
  while (y > 1) {
    x *= x
    y--
  }
  return x
}

function _removeExponentPart(string) {
  return string.replace(_getExponentPart(string), '')
}
