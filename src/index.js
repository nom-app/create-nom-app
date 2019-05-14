// #!/usr/bin/env node

import pkg from '../package.json'

const { version } = pkg

const program = require('commander')

program
  .version(version)
