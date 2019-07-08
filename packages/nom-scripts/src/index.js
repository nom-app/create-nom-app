import chalk from 'chalk'
import { sync as spawnSync } from 'cross-spawn'
import commander from 'commander'

import { version } from '../package.json'

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason)
  throw reason
})

const scriptsString = `${chalk.blue('start')} | ${chalk.blue('test')} | ${chalk.blue('build')} | ${chalk.blue('eject')}`

function main() {
  let script

  const program = new commander.Command('nom-scripts')
    .arguments('command')
    .usage(scriptsString)
    .action((command) => {
      if (typeof command !== 'string') {
        return
      }

      script = command
    })
    .option('-v, --version', `output the version number ${version}`, () => {
      console.log(`v${version}`)
      process.exit(0)
    })
    .option('-V', '', () => {
      console.log(`v${version}`)
      process.exit(0)
    })

  program.parse(process.argv)

  if (typeof script !== 'string') {
    console.log(`${chalk.green('nom-scripts')} ${scriptsString}\n`)
    commander.help()
    process.exit(0)
  }

  switch (script) {
    case 'start':
    case 'test':
    case 'build':
    case 'eject': {
      console.log('spawning', `./scripts/${script}`)
      // Webpack or Babel override/mangle the Node `resolve` mechanism. A
      // solution is to place statement in `eval`.
      // https://github.com/webpack/webpack/issues/1554#issuecomment-336462319
      // eslint-disable-next-line no-eval
      const proc = spawnSync('node', [eval(`require.resolve('./scripts/${script}')`)], { stdio: 'inherit' })

      console.log('proc', proc)

      if (proc.signal) {
        if (proc.signal === 'SIGKILL') {
          // https://www.unix.com/302096767-post5.html?s=de4e02dec039bad162ad857af7942bda
          console.log('The script failed to finish because the program received a kill signal.')
          console.log('')
          console.log('Possible causes are:')
          console.log('   * The system ran out of memory')
          console.log('   * The system is shutting down')
          console.log('   * The process received kill(-9)')
          console.log('https://TODO:base-url/create-nom-app/docs/terminated-by-sigkill')
        } else if (proc.signal === 'SIGTERM') {
          console.log('The script failed to finish because the program received a termination signal.')
          console.log('')
          console.log('Possible causes are:')
          console.log('   * A user killed the process')
          console.log('   * The system is shutting down')
          console.log('https://TODO:base-url/create-nom-app/docs/terminated-by-sigterm')
        }

        process.exit(1)
      }

      process.exit(proc.status)
      break
    }
    default:
      console.log(`Unrecognized script ${chalk.blue(script)}.`)
      console.log(`You may need to update your ${chalk.green('nom-scripts')} dependency.`)
      console.log('To learn more about this message, visit:')
      console.log('https://TODO:base-url/create-nom-app/docs/unrecognized-script')
      break
  }

  return undefined
}

main()
