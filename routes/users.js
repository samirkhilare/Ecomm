const express = require("express");
const router = express.Router();
const UserController = require("../controllers/userController");
const User = require("../modules/userSchema");

// Get all users
router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Update user by ID
router.put("/:userId", UserController.update_user);

module.exports = router;
