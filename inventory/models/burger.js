const mongoose = require("mongoose");

const burgerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    price: {
      type: Number,
      required: true,
      min: 0
    },
    quantity: {
      type: Number,
      default: 1,
      min: 1
    },
    ingredients: {
      type: [String],
      required: true
    },
    isVegetarian: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true } // Include timestamps in the schema options
);

const Burger = mongoose.model("Burger", burgerSchema); // No third argument needed

module.exports = Burger;
