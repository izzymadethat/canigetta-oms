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
