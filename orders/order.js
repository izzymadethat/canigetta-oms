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
    {
      itemId: mongoose.Schema.Types.ObjectId,
      itemType: {
        type: String,
        require: true
      },
      quantity: {
        type: Number,
        require: true,
        default: 1,
        min: 1
      }
    }
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
