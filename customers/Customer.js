const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true
    },
    username: {
      type: String,
      require: true,
      unique: true
    },
    email: {
      type: String,
      require: true,
      unique: true
    }
  },
  { timestamps: true }
);

const Customer = mongoose.model("Customer", customerSchema);

module.exports = Customer;
