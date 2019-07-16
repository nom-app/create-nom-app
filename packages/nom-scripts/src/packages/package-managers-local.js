import path from 'path'

import fs from 'fs-extra'
import { sync as isDirSync } from 'is-directory'

/**
 * This package differs from `packages/create-nom-app/.../package-managers` by
 * searching a directory for a lock file from either Yarn or NPM.
 */

/**
 * Searches `projectRoot` for a lockfile to determine which package manager is
 * being used.
 *
 * @param {*} projectRoot Directory to search for lockfiles.
 * @returns {'yarn'|'npm'} Returns the string of the package manager that is
 * being used (`yarn` or `npm`). Returns `npm` when no package manager lockfile
 * was found.
 */
function whichManager(projectRoot) {
  if (!isDirSync(projectRoot)) {
    return 'npm'
  }

  const lockFiles = [['yarn', 'yarn.lock'], ['npm', 'package-lock.json']]

  // eslint-disable-next-line no-restricted-syntax
  for (const [manager, lockfile] of lockFiles) {
    if (fs.existsSync(path.join(projectRoot, lockfile))) {
      return manager
    }
  }

  return 'npm'
}

export default whichManager
