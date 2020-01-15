import fs from 'fs'
import path from 'path'

const cwd = process.cwd()

/**
 * Attempts to search for the root directory of the create-nom-app project.
 *
 * A directory is considered *root* if the `nom-scripts` dependency exists in a
 * package.json's dependencies. Searches for:
 */
function discoverRoot(): string | undefined {
  const candidates = [path.join(cwd)]

  for (let i = 0; i <= candidates.length; i += 1) {
    const candidate = candidates[i]
    const candidatePkg = path.join(candidate, 'package.json')

    if (fs.existsSync(candidatePkg)) {
      // eslint-disable-next-line global-require
      const pkg = JSON.parse(fs.readFileSync(candidatePkg, 'utf8'))

      if (typeof pkg.dependencies === 'object' && 'nom-scripts' in pkg.dependencies) {
        return candidate
      }
    }
  }

  return undefined
}

export default discoverRoot
