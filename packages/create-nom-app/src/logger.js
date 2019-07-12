// TODO: This needs to go in its own package
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
