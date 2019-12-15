import pkg from '../../package.json'

const mockedPackage = {
  ...pkg,
  version: '__mocked_version_0.0.0-development__'
}

export = mockedPackage
