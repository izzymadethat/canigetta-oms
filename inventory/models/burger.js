const mongoose = require("mongoose");

const Burger = mongoose.model("Burger", {
  name: {
    type: String,
    required: true,
    trim: true,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  ingredients: {
    type: [String],
    required: true,
  },
  isVegetarian: {
    type: Boolean,
    default: false,
  },
  calories: {
    type: Number,
    required: true,
    min: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Burger;
