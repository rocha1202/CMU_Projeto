const express = require("express");
const User = require("../models/User");
const router = express.Router();

router.post("/register", async (req, res) => {
  const { email, password, username } = req.body;

  const user = await User.create({ email, password, username });
  res.json(user);
});

module.exports = router;