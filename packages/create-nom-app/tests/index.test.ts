/* eslint no-empty: "warn"*/
import x from '../src/index'

describe('Create Nom App CLI', () => {
  let exitCode: null | number = null
  let spyOnLog: jest.SpyInstance
  let spyOnErr: jest.SpyInstance
  let spyOnExit: jest.SpyInstance

  beforeEach(() => {
    exitCode = null
    spyOnLog = jest.spyOn(console, 'log').mockImplementation()
    spyOnErr = jest.spyOn(console, 'error').mockImplementation()
    spyOnExit = jest.spyOn(process, 'exit').mockImplementation(x => {
      exitCode = x || null
      throw new Error(`Mock process.exit()`)
    })
  })

  afterEach(() => {
    jest.clearAllMocks()
  })
  test('show usage instructions and exit with code 1 when no project name is supplied', () => {
    try {
      void x([])
    } catch (e) {
      // catches process.exit() - we don't need to do anything
    }
    expect(exitCode).toStrictEqual(1)
    expect(spyOnExit).toHaveBeenCalledTimes(1)
    expect(spyOnLog).toMatchSnapshot()
    // expect(spyOnErr).toMatchSnapshot()
  })

  describe('--info', () => {
    let returnValue: any = null
    test('gracefully return', () => {
      try {
        returnValue = void x(['--info'])
      } catch (e) {}
      expect(returnValue).toStrictEqual(undefined)
      expect(exitCode).toStrictEqual(null)
      expect(spyOnExit).toHaveBeenCalledTimes(0)
    })

    test('display environment information', () => {
      try {
        void x(['--info'])
      } catch (e) {}
      expect(spyOnLog).toMatchSnapshot()
      expect(spyOnErr).toMatchSnapshot()
    })
  })
})
