const { createLogger, format, transports } = require("winston");
const { combine, timestamp, printf } = format;

let logLevel = process.env.LOG_LEVEL;

const myFormat = printf(({ level, message, timestamp }) => {
  return `${timestamp} ${level}: ${message}`;
});
const prodFormat = printf(({ level, message }) => {
  return `${level}: ${message}`;
});

const productionLogger = () => {

  return createLogger({
    level: logLevel || "info",
    format: combine(
      prodFormat
    ),
    transports: [
      new transports.Console(),
    ],
  });
};

const devLogger = () => {

  return createLogger({
    level: "info",
    format: combine(
      format.colorize(),
      timestamp({ format: "HH:mm:ss" }),
      myFormat
    ),
    transports: [
      new transports.Console()
    ],
  });
};

module.exports = { productionLogger, devLogger };