const express = require("express");
const burgerRoutes = require("./routes/burgers");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Inventory Service home route");
});

app.use(burgerRoutes);

module.exports = app;
