import fs from 'fs'
import path from 'path'

const cwd = process.cwd()

/**
 * Attempts to search for the root directory of the create-nom-app project.
 *
 * Searches for:
 *
 * : cwd/package.json
 */
function discoverRoot() {
  const candidates = [
    path.join(cwd, 'package.json')
  ]

  for (let i = 0; i <= candidates.length; i += 1) {
    const candidate = candidates[i]
    console.log('file maybe at ', candidate)
    if (fs.existsSync(candidate)) {
      // eslint-disable-next-line global-require, import/no-dynamic-require
      const pkg = JSON.parse(fs.readFileSync(candidate, 'utf8'))

      if (typeof pkg.dependencies === 'object' && 'nom-scripts' in pkg.dependencies) {
        return candidate
      }
    }
  }

  return undefined
}

export default discoverRoot
