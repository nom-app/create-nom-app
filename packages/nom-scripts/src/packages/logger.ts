// TODO: NOTICE: This module is duplicated from `create-nom-app`.
// DO NOT MODIFY THIS FILE. MODIFY THE `CREATE-NOM-APP` VARIANT, AND THEN COPY
// TO THIS FILE.

// NOTICE: This module is duplicated to `nom-scripts`.
// This is so incredibly not DRY.
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
    } as any) // TODO: remove the `any` cast. Supposedly, `json` and `colorize` are not valid. It might be best to remove this once snapshots cover these lines to ensure the output is not changed by removing untyped options.
  ],
  exitOnError: false
})

export default logger
