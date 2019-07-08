import discoverRoot from '../packages/discoverRoot'

const projectRoot = discoverRoot()

console.log(projectRoot)

if (projectRoot === undefined) {
  console.error('nom-scripts did not find a create-nom-app project.')
}
