const fs = require("fs");
const appRoot = require("app-root-path");

const accessLogStream = fs.createWriteStream(`${appRoot}/log/access.log`, { flags: 'a' })
// __dirname : 루트 경로

module.exports = accessLogStream;