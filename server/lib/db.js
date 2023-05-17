var mongoose = require("mongoose");
const logger = require("../lib/logger");

module.exports = {
  connect: function(callback) {
    let dbUrl = process.env.DB_URL;
    if (!dbUrl) {
      throw new Error("Please set mongodb url in env as DB_URL");
    }
    mongoose.set("useNewUrlParser", true);
    mongoose.set("useFindAndModify", false);
    mongoose.set("useCreateIndex", true);
    mongoose.connect(process.env.DB_URL, {
      useFindAndModify: false,
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    mongoose.connection.on("connected", () => {
      logger.info(`Connected to db ${mongoose.connection.db.databaseName} in ${mongoose.connection.host}`);
      callback && callback(mongoose.connection);
    });
    mongoose.connection.on("error", err => {
      logger.error(`Mongoose Connection has occured ${err} error`);
    });
    mongoose.connection.on("disconnected", () => {
      logger.info("Mongoose Connection is disconnected");
    });
    process.on("SIGINT", () => {
      mongoose.connection.close(() => {
        logger.info("Mongoose Connection is disconnected due to application termination");
        // eslint-disable-next-line no-process-exit
        process.exit(0);
      });
    });
    return mongoose.connection;
  },
  disconnect: function() {
    return mongoose.connection.close();
  }
};
