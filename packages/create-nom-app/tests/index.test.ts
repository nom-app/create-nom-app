/* eslint-disable @typescript-eslint/no-var-requires */
import x from '../src/index'

describe('Create Nom App CLI', () => {
  let exitCode: null | number = null
  beforeEach(() => {
    exitCode = null
  })

  test('show usage instructions and exit with code 1 when no project name is supplied', () => {
    const spyOnExit = jest.spyOn(process, 'exit').mockImplementation(x => {
      exitCode = x || null
      throw new Error(`Mock process.exit()`)
    })
    const spyOnLog = jest.spyOn(console, 'log').mockImplementation()
    try {
      void x([])
    } catch (e) {
      // catches process.exit() - we don't need to do anything
    }
    expect(exitCode).toStrictEqual(1)
    expect(spyOnExit).toHaveBeenCalledTimes(1)
    expect(spyOnLog).toMatchSnapshot()
  })
})
