require("dotenv").config();
const app = require("./customers");
const mongoose = require("mongoose");

mongoose
  .connect(process.env.CUSTOMERS_MONGO_URL)
  .then(() => {
    console.log("Connected to Customers Database!");
    app.listen(5555, () => {
      console.log("Customer service available on Port 5555");
    });
  })
  .catch(() => {
    console.log("Error connecting to database");
  });
