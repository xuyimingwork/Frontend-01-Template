function convertNumberToString(number, radix = 10) {
  if (typeof radix !== 'number' || ![2, 8, 10, 16].includes(radix)) 
    throw new Error(`本方法不支持 ${radix} 进制`)

  let integer = Math.floor(number)
  let fraction = number - integer

  let string = ''
  while (integer > 0) {
    string = _charAt(integer % radix) + string
    integer = Math.floor(integer / radix)
  }

  if (string.length === 0) string = '0'

  if (fraction > 0) string += '.'
  while (fraction > 0) {
    const current = Math.floor(fraction * radix)
    fraction = fraction * radix - current
    string += _charAt(current)
  }

  return string
}

function _charAt(number) {
  return '0123456789abcdefg'[number]
}