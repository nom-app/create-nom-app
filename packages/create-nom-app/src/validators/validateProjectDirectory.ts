import chalk from 'chalk'
import isDirectory from 'is-directory'

function validateProjectDirectory(directory: string): void {
  const errors: string[] = []

  if (isDirectory.sync(directory)) {
    errors.push('directory already exists.')
  }

  if (errors.length) {
    console.error(`Unable to create project directory ${chalk.red(directory)} because:`)

    errors.forEach(err => {
      console.error(chalk.red(`  - ${err}`))
    })

    process.exit(1)
  }
}

export default validateProjectDirectory
