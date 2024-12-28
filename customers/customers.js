const express = require("express");
const app = express();
const Customer = require("./Customer");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Customers Service home route");
});

app.post("/customers", async (req, res) => {
  try {
    const customerData = {
      name: req.body.name,
      username: req.body.username,
      email: req.body.email
    };

    const customer = await new Customer(customerData).save();
    res.status(201).send(customer);
  } catch (error) {
    res.sendStatus(500);
    throw new Error(error);
  }
});

app.get("/customers", async (req, res) => {
  const customers = await Customer.find();
  res.send(customers);
});

module.exports = app;
