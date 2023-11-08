import { createLogger, transports, format } from 'winston';
// Create a logger
export const logger = createLogger({
  level: 'info', // Set the log level
  format: format.combine(
    format.colorize(),
    format.timestamp(),
    format.printf(({ timestamp, level, message }) => {
      return `${timestamp} [${level}]: ${message}`;
    })
  ),
  transports: [
    new transports.Console(), // Log to the console
    // new transports.File({ filename: 'error.log', level: 'error' }), // Log errors to a file
    // new transports.File({ filename: 'combined.log' }) // Log all messages to another file
  ]
});

// Example log messages


// To test uncaught exception handling
// throw new Error('An unhandled exception occurred.');
