const winston = require('winston');
const RotateFile = require('winston-daily-rotate-file');
const config = require('./config');

// default log level; may be overridded by transports
const level = config.logging.level;
// logging format configuration
const formats = [
  winston.format.timestamp(),
  winston.format.splat(),
  winston.format.printf(({ timestamp, level, message }) => `${timestamp} [${level}] ${message}`),
];
// console transport
const console = new winston.transports.Console();

/**
 * Winston Logger Options
 */
const options = {
  level,
  format: winston.format.combine(...formats),
  exitOnError: false,
};

/**
 * Create Logger with base configuration
 */
const logger = winston.createLogger(options);
logger.add(console);

// conditionally add file-based logging
if (config.logging.file.enabled) {
  const errorFile = new RotateFile({
    level: 'error',
    dirname: config.logging.file.dir,
    filename: 'errors-%DATE%.log',
    maxSize: config.logging.file.maxSize,
  });
  logger.add(errorFile);

  const standardFile = new RotateFile({
    dirname: config.logging.file.dir,
    filename: 'application-%DATE%.log',
    maxSize: config.logging.file.maxSize,
  });
  logger.add(standardFile);
}

module.exports = logger;
