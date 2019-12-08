import chalk from 'chalk'
import validate from 'validate-npm-package-name'

function validateProjectName(name: string): void {
  const validation = validate(name)
  let errors: string[] = []

  errors = [...errors, ...(validation.errors || []), ...(validation.warnings || [])]

  if (errors.length) {
    console.error(`Project name ${chalk.red(name)} is invalid:`)

    errors.forEach(err => {
      console.error(chalk.red(`  - ${err}`))
    })

    process.exit(1)
  }
}

export default validateProjectName
