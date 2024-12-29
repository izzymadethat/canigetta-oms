const express = require("express");
const app = express();
const Order = require("./order");
const mongoose = require("mongoose");
const axios = require("axios");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Orders service home route");
});

/* 
  Data needed for request:
  {
    customerId: Customer._id
    items: [
      {
        name: "Item Name",
        type: ["burger", "drink", "fries"],
        quantity: min 1,
        price: *Needs to later be stored in hash to prevent price errors,
        ingredients: ["for burgers"] || null,
        isVegetarian: true || false
      }
    ]
  }
*/
app.post("/orders", async (req, res) => {
  const newOrder = {};

  // check if customer exists
  const customer = await axios.get(
    `http://customers:5555/customers/${req.body.customerId}`
  );

  if (!customer.data._id) {
    return res.status(400).send("Customer not found");
  }

  newOrder.customerId = new mongoose.Types.ObjectId(req.body.customerId);
  newOrder.items = [];

  if (!req.body.items || req.body.items === 0) {
    res.status(400).send("Can't create order with no items");
  }

  for (const item of req.body.items) {
    if (item.type === "burger") {
      const res = await axios.post("http://inventory:4545/burgers", item);
      if (res.status !== 201) {
        return res.status(500).send("Could not complete order");
      }
      const burger = {
        _id: res.data._id,
        type: "burger"
      };
      newOrder.items.push(burger);
    }
  }
  const order = await new Order(newOrder).save();
  res.status(201).send(order);
});

app.get("/orders", async (req, res) => {
  const orders = await Order.find();
  res.send(orders);
});

app.get("/orders/:id", async (req, res) => {
  Order.findById(req.params.id).then(async (order) => {
    if (order) {
      // create order object
      const orderRes = {};

      // Find customer
      const response = await axios.get(
        `http://customers:5555/customers/${order.customerId}`
      );
      const customer = response.data;
      if (!customer._id) {
        return res.status(400).send("Could not find customer");
      } else {
        orderRes.customer = customer;
      }

      // get order items info
      orderRes.items = [];
      for (const item of order.items) {
        // check for item type and navigate to get data
        if (item.type === "burger") {
          const itemRes = await axios.get(
            `http://inventory:4545/burgers/${item._id}`
          );
          const burger = itemRes.data;
          if (!burger._id) {
            return res
              .status(400)
              .send("One or more items in burgers could not be found");
          } else {
            orderRes.items.push(burger);
          }
        }
      }

      res.send(orderRes);
    } else {
      return res.sendStatus(404);
    }
  });
});

module.exports = app;
