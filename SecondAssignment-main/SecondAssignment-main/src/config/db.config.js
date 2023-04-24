const mongose = require("mongoose");
require("dotenv").config();

const db_url = process.env.DB_URL;
const db_connection = async () => {
  await mongose.connect(db_url);
  console.log("database connection established ......");
};

module.exports = db_connection;
