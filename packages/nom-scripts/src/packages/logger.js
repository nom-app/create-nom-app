// TODO: NOTICE: This module is duplicated from `create-nom-app`.
// DO NOT MODIFY THIS FILE. MODIFY THE `CREATE-NOM-APP` VARIANT, AND THEN COPY
// TO THIS FILE.

// DO NOT MODIFY THIS FILE
import winston from 'winston'

/**
 * Uses NPM levels for logging:
 *  error: 0
 *  warn: 1
 *  info: 2
 *  verbose: 3
 *  debug: 4
 *  silly: 5
 */
const logger = winston.createLogger({
  format: winston.format.simple(),
  transports: [
    new winston.transports.Console({
      level: (process.env.LOG_LEVEL || 'info').toLowerCase(),
      handleExceptions: true,
      json: false,
      colorize: true
    })
  ],
  exitOnError: false
})

export default logger
