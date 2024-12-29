const app = require("./orders");
const mongoose = require("mongoose");

mongoose
  .connect(process.env.ORDERS_MONGO_URL)
  .then(() => {
    console.log("Orders service connected to database!");
    app.listen(7777, () => {
      console.log("Orders service now available on port 7777");
    });
  })
  .catch(() => {
    console.log("Error connecting to Orders database");
  });
