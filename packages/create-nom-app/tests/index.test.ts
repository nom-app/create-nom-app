/* eslint no-empty: "off"*/

import CNA from '../src/index'

describe('Create Nom App CLI', () => {
  let exitCode: null | number = null
  let spyOnLog: jest.SpyInstance
  let spyOnErr: jest.SpyInstance
  let spyOnExit: jest.SpyInstance
  let spyOnStdOut: jest.SpyInstance

  beforeEach(() => {
    jest.clearAllMocks()
    exitCode = null
    spyOnLog = jest.spyOn(console, 'log').mockImplementation()
    spyOnErr = jest.spyOn(console, 'error').mockImplementation()
    spyOnStdOut = jest.spyOn(process.stdout, 'write').mockImplementation()
    spyOnExit = jest.spyOn(process, 'exit').mockImplementation(x => {
      exitCode = x || 0
      throw new Error(`Mock process.exit()`)
    })
  })

  test('show usage instructions and exit with code 1 when no project name is supplied', () => {
    try {
      void CNA([])
    } catch (e) {
      // catches process.exit() - we don't need to do anything
    }
    expect(exitCode).toStrictEqual(1)
    expect(spyOnExit).toHaveBeenCalledTimes(1)
    expect(spyOnLog).toMatchSnapshot()
    // expect(spyOnErr).toMatchSnapshot()
  })

  describe('--help, -h', () => {
    test('display help (-h)', () => {
      try {
        void CNA(['-h'])
      } catch (e) {}
      expect(exitCode).toStrictEqual(0)
      expect(spyOnExit).toHaveBeenCalled()
      expect(spyOnStdOut).toMatchSnapshot()
    })

    test('display help (--help)', () => {
      try {
        void CNA(['--help'])
      } catch (e) {}
      expect(exitCode).toStrictEqual(0)
      expect(spyOnExit).toHaveBeenCalled()
      expect(spyOnStdOut).toMatchSnapshot()
    })
  })

  describe('--info', () => {
    let returnValue: any = null
    test('gracefully return', () => {
      try {
        returnValue = void CNA(['--info'])
      } catch (e) {}
      expect(returnValue).toStrictEqual(undefined)
      expect(exitCode).toStrictEqual(null)
      expect(spyOnExit).toHaveBeenCalledTimes(0)
    })

    test('display environment information', () => {
      try {
        void CNA(['--info'])
      } catch (e) {}
      expect(spyOnStdOut).toMatchSnapshot()
      expect(spyOnLog).toMatchSnapshot()
      expect(spyOnErr).toMatchSnapshot()
    })
  })

  describe('-v, --version, -V', () => {
    test('-v', () => {
      try {
        void CNA(['-v'])
      } catch (e) {}
      expect(exitCode).toStrictEqual(0)
      expect(spyOnExit).toHaveBeenCalledTimes(1)
      expect(spyOnLog).toMatchSnapshot()
    })
    test('-V', () => {
      try {
        void CNA(['-V'])
      } catch (e) {}
      expect(exitCode).toStrictEqual(0)
      expect(spyOnExit).toHaveBeenCalledTimes(1)
      expect(spyOnLog).toMatchSnapshot()
    })
    test('--version', () => {
      try {
        void CNA(['--version'])
      } catch (e) {}
      expect(exitCode).toStrictEqual(0)
      expect(spyOnExit).toHaveBeenCalledTimes(1)
      expect(spyOnLog).toMatchSnapshot()
    })
  })
})
