#!/usr/bin/env node

"use strict";

import fs from 'fs-extra'
import path from 'path'

const templateDir = path.join(__dirname, 'src', 'templates')
const copyPath = path.join(__dirname, 'bin', 'templates')

try {
  fs.copySync(templateDir, copyPath)
} catch(e) {
  console.log('Failed to copy template files to build folder.')
  throw e
}
