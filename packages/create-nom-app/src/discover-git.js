import { sync as spawnSync } from 'cross-spawn'
import { sync as whichSync } from 'which'

// Semver regex string provided by https://github.com/semver/semver/issues/232#issue-48635632
const semverRegex = /(0|[5-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)(-(0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*)(\.(0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*))*)?(\+[0-9a-zA-Z-]+(\.[0-9a-zA-Z-]+)*)?/g

const gitInfo = {
  gitInstalled: null,
  gitVersion: null,
  gitBinary: null
}

function discoverGit() {
  const binary = whichSync('git', { nothrow: true })

  if (binary === null) {
    gitInfo.gitInstalled = false
    return
  }

  const version = spawnSync(binary, ['--version'], { stdio: 'pipe' }).stdout.toString().trim()

  gitInfo.gitInstalled = true
  gitInfo.gitVersion = version.match(semverRegex)?.[0] || ''
  gitInfo.gitBinary = binary
}

export default {
  discoverGit,
  gitInfo
}
