import fs from 'fs';
import path from 'path';
import { Logger, createLogger, format, transports } from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';
import { config } from '../config';
const { combine, timestamp, json, printf } = format;

let dir = config.logDirectory;
if (!dir) dir = path.resolve('logs');

// create directory if it is not present
if (!fs.existsSync(dir)) {
  // Create the directory if it does not exist
  fs.mkdirSync(dir);
}

const logLevel = config.environment === 'development' ? 'debug' : 'warn';

// Custom format that includes the controller name if provided
const customFormat = printf(({ level, message, timestamp, controller }) => {
  return `${timestamp} [${level.toUpperCase()}] ${controller ? `[${controller}]` : ''}: ${message}`;
});

const levels = {
  emerg: 0,
  alert: 1,
  crit: 2,
  error: 3,
  warn: 4,
  notice: 5,
  info: 6,
  debug: 7,
};

const options = {
  file: {
    level: logLevel,
    filename: dir + '/%DATE%.log',
    datePattern: 'YYYY-MM-DD',
    zippedArchive: true,
    timestamp: true,
    handleExceptions: true,
    humanReadableUnhandledException: true,
    prettyPrint: true,
    json: true,
    maxSize: '20m',
    colorize: true,
    maxFiles: '14d',
  },
};

export default class ControllerLogger {
  private logger: Logger;

  constructor() {
    this.logger = createLogger({
      levels: levels,
      level: process.env.LOG_LEVEL || 'info',
      format: combine(timestamp(), json(), customFormat),
      transports: [
        new transports.Console({
          format: format.combine(
            format.colorize(), // Add colors to the console output
            format.simple(),
          ),
        }),
      ],
      exceptionHandlers: [new DailyRotateFile(options.file)],
      exitOnError: false,
    });
  }

  public log(level: string, message: string, controller?: string): void {
    this.logger.log({
      level,
      message,
      ...(controller && { controller }), // Conditionally add the controller property
    });
  }

  // Convenience methods
  public warn(message: string, controller?: string): void {
    this.log('warn', message, controller);
  }

  public info(message: string, controller?: string): void {
    this.log('info', message, controller);
  }

  public error(message: string, controller?: string): void {
    this.log('error', message, controller);
  }
}

// Example usage
// const logger = new ControllerLogger();
// logger.warn('test msg', 'LoginController'); // Now logs with the controller name
