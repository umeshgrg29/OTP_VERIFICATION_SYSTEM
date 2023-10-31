const mongoose = require("mongoose");
const { MONGODB_URL } = process.env;

const connectWithDb = () => {
  console.log(MONGODB_URL)
  mongoose
    .connect(MONGODB_URL, {
        useNewUrlParser : true,
        useUnifiedTopology : true
    })
    .then(() => {
      console.log("DB connected sucessfully");
    })
    .catch((err) => {
      console.log("Error connecting to MongoDB: ", err);
      process.exit(1);
    });
};

module.exports = connectWithDb
