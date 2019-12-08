import writeHelp from '../src/writeHelp'

describe('writeHelp', () => {
  test('display help', () => {
    const spyOnLog = jest.spyOn(console, 'log').mockImplementation()
    const spyOnError = jest.spyOn(console, 'error').mockImplementation()
    writeHelp()
    expect(spyOnLog).toMatchSnapshot()
    expect(spyOnError).toMatchSnapshot()
    spyOnLog.mockClear()
    jest.clearAllMocks()
  })
})
