import chalk from 'chalk'

const helpLines = [
  '',
  `Only ${chalk.blue('<project-name>')} is required.`,
  '',
  'Example:',
  `  ${chalk.green('create-nom-app')} ${chalk.blue('my-first-app')}`,
  '',
  `Run ${chalk.green('create-nom-app')} --help to see all options.`,
  '',
  'If you encounter any issues, feel free to report it to:',
  ' > https://github.com/nom-app/create-nom-app/issues'
]

function writeHelp(): void {
  helpLines.forEach(line => {
    console.log(`  ${line}`)
  })
}

export default writeHelp
