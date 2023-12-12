const mongoose = require("mongoose");
const url =process.env.URL;

exports.mongoConect = async () => {
  mongoose
    .connect(url)
    .then((db) => console.log(`db is connected :${db.connection.host}`))
    .catch((e) => {
      console.log(e);
    });
};
