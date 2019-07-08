function add(number1, number2) {
  if (typeof number1 !== 'number' || typeof number2 !== 'number') {
    throw Error('add() did not receive two numbers.')
  }

  return number1 + number2
}

function subtract(number1, number2) {
  if (typeof number1 !== 'number' || typeof number2 !== 'number') {
    throw Error('subtract() did not receive two numbers.')
  }

  return number1 - number2
}

export default add

export {
  add,
  subtract
}
