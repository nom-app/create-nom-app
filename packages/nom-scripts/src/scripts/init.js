import minimist from 'minimist'

console.log('hello from init')
console.log('cwd', process.cwd())

const argv = minimist(process.argv.slice(2))
console.dir(argv);
