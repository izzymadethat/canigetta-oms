require("dotenv").config();
const app = require("./inventory");
const mongoose = require("mongoose");

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Inventory services connected to MongoDB");
    app.listen(4545, () => {
      console.log("Inventory Services is running on port 4545!");
    });
  })
  .catch((err) => {
    console.log("Error connecting to MongoDB", err);
  });
