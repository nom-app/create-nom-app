import { sync as spawnSync } from 'cross-spawn'
import { sync as whichSync } from 'which'

interface PackageManager {
  binary: string
  version: string
}

const packageManagers: {
  [key: string]: PackageManager
} = {}
// TODO: Bring this module to its own package, preferably using
// nom-scripts/create-nom-app to handle dependencies.

/**
 * Searches for a `manager` on the system and, if it exists, adds information
 * about the manager to `packageManagers`.
 *
 * @param {string}  manager Name of the package manager
 * @param {boolean} ignoreCache Whether or not to ignore checking the cache.
 * @returns {undefined} Always returns `undefined`.
 */
function discoverManager(manager: string, ignoreCache = false): void {
  // The `manager` was previously discovered and is in the cache.
  if (ignoreCache === false && Object.prototype.hasOwnProperty.call(packageManagers, manager)) {
    return
  }

  const binary = whichSync(manager, { nothrow: true })

  if (binary === null) {
    return
  }

  const version = spawnSync(binary, ['--version'], {
    stdio: 'pipe'
  })
    .stdout.toString()
    .trim()

  packageManagers[manager] = {
    binary,
    version
  }
}

/**
 * Search for an array of managers.
 *
 * @param {string|array} searchFor A list of managers to search for.
 * @param {boolean|undefined} ignoreCache See discoverManager
 */
function discoverMany(managers: string[] = [], ignoreCache?: boolean): void {
  const searchFor: string[] = []

  if (typeof managers === 'string') {
    searchFor.push(managers)
  } else {
    searchFor.push(...managers)
  }

  searchFor.forEach(manager => {
    discoverManager(manager, ignoreCache)
  })
}

/**
 * Discover common package managers: npm, yarn.
 */
function discoverCommon(): void {
  discoverMany(['npm', 'yarn'])
}

/**
 * Clears the cache of package managers.
 */
function clearCache(): void {
  // eslint-disable-next-line no-restricted-syntax
  for (const manager in packageManagers) {
    if (Object.prototype.hasOwnProperty.call(packageManagers, manager)) {
      delete packageManagers[manager]
    }
  }
}

/**
 * Check if a `manager` exists in `packageManagers`.
 *
 * @param {string} manager The manager to check.
 * @returns {boolean} Whether or not `manager` is in `packageMangers`
 */
function hasManager(manager: string): boolean {
  if (manager in packageManagers) {
    return true
  }

  return false
}

/**
 * Get a `manager` from `packageManagers`. If the manager can not be found, an
 * empty object is returned.
 *
 * Use`.hasManager()` to check if a manager exists in `packageManagers`.
 *
 * @param {string} manager The name of the package manager to get.
 * @returns {object}
 */
function getManager(manager: string): PackageManager {
  if (hasManager(manager)) {
    return packageManagers[manager]
  }

  return {
    version: '',
    binary: ''
  }
}

export default {
  hasManager,
  getManager,
  discoverCommon,
  discoverMany,
  discoverManager,
  packageManagers,
  clearCache
}
