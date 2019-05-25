import chai, { assert, expect } from 'chai'
import main, { add, subtract } from '../src'

chai.should()

describe('Main App', () => {
  it('should export default add() function', () => {
    assert(main === add, 'Default export must be `add` function.')
  })

  it('exports `subtract` function', () => {
    expect(subtract).to.be.a('function')
  })
})

describe('add(number1, number2)', () => {
  it('fails when not given number1 is not a number', () => {
    assert.throws(add.bind(undefined, 'a string', 2), 'add() did not receive two numbers.')
  })

  it('fails when not given number2 is not a number', () => {
    assert.throws(add.bind(undefined, 3, 'string'), 'add() did not receive two numbers.')
  })

  it('returns the added number', () => {
    expect(add(1, 2)).to.be.a('number')
    expect(add(4, 5)).to.equal(9)
  })
})

describe('subtract(number1, number2)', () => {
  it('fails when not given number1 is not a number', () => {
    assert.throws(subtract.bind(undefined, 'a string', 2), 'subtract() did not receive two numbers.')
  })

  it('fails when not given number2 is not a number', () => {
    assert.throws(subtract.bind(undefined, 3, 'string'), 'subtract() did not receive two numbers.')
  })

  it('returns the subtracted number', () => {
    expect(subtract(1, 2)).to.be.a('number')
    expect(subtract(4, 5)).to.equal(-1)
  })
})
