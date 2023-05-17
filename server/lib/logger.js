const { productionLogger, devLogger } = require("./loggerConfig");

let logger = productionLogger();
let nodeEnv = process.env.NODE_ENV;
if (nodeEnv === "development") {
  logger = devLogger();
}
module.exports = logger;