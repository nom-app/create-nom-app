import semver from 'semver'

const minimumNPMVersion = '6.10.0'

// TODO: Require minimum supported version gta 6.0.0
function validateNPMVersion(version) {
  console.log('validating npm', version)
  if (!semver.gte(version, minimumNPMVersion)) {
    console.warn('uh oh')

    process.exit(1)
  }
}

export default validateNPMVersion
