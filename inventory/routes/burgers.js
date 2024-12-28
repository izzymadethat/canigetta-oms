const router = require("express").Router();
const Burger = require("../models/burger");

// Make a new Burger
router.post("/burgers", async (req, res) => {
  const burgerData = {
    name: req.body.name,
    price: req.body.price,
    ingredients: req.body.ingredients,
    isVegetarian: req.body.isVegetarian || false
  };

  // Create a new burger and save it to the database
  try {
    const burger = await new Burger(burgerData).save();
    res.status(201).send(burger);
  } catch (error) {
    throw new Error(error);
  }
});

// Get all Burgers made
router.get("/burgers", async (req, res) => {
  try {
    const burgers = await Burger.find();
    res.send(burgers);
  } catch (error) {
    throw new Error(error);
  }
});

// Get a specific Burger by ID
router.get("/burgers/:id", async (req, res) => {
  try {
    const burger = await Burger.findById(req.params.id);
    if (!burger) {
      res.sendStatus(404);
    }
    res.send(burger);
  } catch (error) {
    throw new Error(error);
  }
});

// Delete a burger order
router.delete("/burgers/:id", async (req, res) => {
  try {
    const burgerId = req.params.id;
    const burger = await Burger.findOneAndDelete(burgerId);
    if (!burger) {
      res.sendStatus(404);
    }

    res.send("Burger deleted successfully");
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = router;
