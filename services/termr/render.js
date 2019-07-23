const cs = require('cross-spawn')
const fs = require('fs-extra')
const path = require('path')
const isDir = require('is-directory')
const glob = require('glob')

const XVFB_SERVER_ARG = process.env.XVFB_SERVER_ARG || '-screen 0 1920x1080x24'
let RAW_TERM_DIR = path.isAbsolute(process.env.RAW_TERM_DIR)
  ? process.env.RAW_TERM_DIR
  : path.resolve(process.env.RAW_TERM_DIR)
let OUTPUT_DIR = path.isAbsolute(process.env.OUTPUT_DIR)
  ? process.env.OUTPUT_DIR
  : path.resolve(process.env.OUTPUT_DIR)

fs.ensureDirSync(OUTPUT_DIR)

if (typeof RAW_TERM_DIR !== 'string' || !isDir.sync(RAW_TERM_DIR)) {
  console.error('RAW_TERM_DIR must point to a directory')
  console.error('RAW_TERM_DIR currently is pointing to:', RAW_TERM_DIR)
  process.exit(1)
}

if (typeof OUTPUT_DIR !== 'string' || !isDir.sync(OUTPUT_DIR)) {
  console.error('OUTPUT_DIR must point to a directory')
  console.error('OUTPUT_DIR currently is pointing to:', OUTPUT_DIR)
  process.exit(1)
}

const rawTerminalFiles = glob.sync(`${RAW_TERM_DIR}/*.yml`)

console.log('files to render', rawTerminalFiles)
console.log('rawTerm is', process.env.RAW_TERM_DIR)

for (const file of rawTerminalFiles) {
  const basename = path.basename(file, '.yml')

  console.log(`\nRendering ${file}`)

  cs.sync('xvfb-run', ['-a', '--server-args', `"${XVFB_SERVER_ARG}"`, 'terminalizer', 'render',  '--output', `"${basename}"`, '--quality', '100', `"${file}"`], {
    shell: '/bin/bash',
    stdio: 'inherit',
    cwd: OUTPUT_DIR
  })
}
