const router = require("express").Router();

router.post("/burgers", (req, res) => {
  res.send("POST /burgers");
});

module.exports = router;
