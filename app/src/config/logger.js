const { createLogger, transports, format } = require("winston");
const { combine, timestamp, label, printf, json, simple, colorize } = format;

const printFormat = printf(({ timestamp, label, level, message }) => {
  return `${timestamp} [${label}] ${level} : ${message}`;
});
const printLogFormat = {
  file: combine(
    label({
      label: "벡앤드 맛보기",
    }),
    timestamp({
      format: "YYYY-MM-DD HH:mm:dd",
    }),
    printFormat
  ),
  console: combine(colorize(), simple()),
};

// option object
const opts = {
  file: new transports.File({
    filename: "access.log",
    dirname: "./logs",
    level: "info",
    format: printLogFormat.file,
  }),
  console: new transports.Console({
    level: "info",
    format: printLogFormat.console,
  }),
};
const logger = createLogger({
  transports: [opts.file],
});

// 개발환경일 때 console로그를 보여주기
if (process.env.NODE_ENV !== "production") {
  logger.add(opts.console);
}

module.exports = logger;