/* eslint-disable @typescript-eslint/no-var-requires */
describe('main', () => {
  test('blank', () => {
    const spyOnExit = jest.spyOn(process, 'exit').mockImplementation()
    require('../src/index')(process.argv.slice(5))

    expect(spyOnExit).toHaveBeenCalledWith(0)
  })
})
