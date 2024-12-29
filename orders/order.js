/* Model
    CustomerID <-- stores id from customers database
    Items <-- stores list of items ordered ([Burger + details, Fries + details, etc.])
    OrderDate <-- Timestamp of order received
    isComplete <-- Value of order completion
    OrderCompleted <-- Timestamp of order completed
*/
const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  customerId: {
    type: mongoose.Schema.Types.ObjectId,
    require: true
  },
  items: [
    { _id: { type: mongoose.Schema.Types.ObjectId }, type: { type: String } }
  ],
  orderDate: {
    type: Date,
    default: Date.now
  },
  isComplete: {
    type: Boolean,
    default: false
  },
  orderCompletedDate: {
    type: Date
  }
});

module.exports = mongoose.model("Order", orderSchema);
