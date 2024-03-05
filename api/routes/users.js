
import express from "express";
const router = express.Router();
import User from "../models/User.js";
import Post from "../models/Post.js";

import bcrypt from 'bcrypt';

//UPDATE
router.put("/:id", async (req, res) => {
  if (req.body.userId === req.params.id) {
    try {

      if (!req.body.firstName || !req.body.lastName || !req.body.username || !req.body.email || !req.body.password) {
        return res.status(400).json("All fields are mandatory");
    }
      // Check if the request contains a new password
      if (req.body.password) {
        // Hash the new password
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(req.body.password, salt);
      }

      // Get the existing user document
      const existingUser = await User.findById(req.params.id);
      if (!existingUser) {
        return res.status(404).json("User not found");
      }

      // Update user information
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        { $set: req.body },
        { new: true }
      );

      // Update username, first name, and last name in posts
      await Post.updateMany(
        { username: existingUser.username }, // Use the existing username
        { $set: { 
            username: req.body.username,
            "firstName": updatedUser.firstName,
            "lastName": updatedUser.lastName
         } 
        }
      );

      res.status(200).json({ message: "User information updated successfully", ...updatedUser});
    } catch (err) {
      res.status(500).json({ error: "An error occurred while updating user information", err });
    }
  } else {
    res.status(401).json({ error: "You can update only your account!"});
  }
});



//DELETE
router.delete("/:id", async (req, res) => {
  if (req.body.userId === req.params.id) {
    try {
      // Find the user to be deleted
      const user = await User.findById(req.params.id);
      if (!user) {
        return res.status(404).json("User not found!");
      }

      // Delete all posts related to the user
      await Post.deleteMany({ username: user.username });

      // Delete the user
      await User.findByIdAndDelete(req.params.id);

      res.status(200).json("User and related posts have been deleted");
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(401).json("You can delete only your account!");
  }
});


//GET USER
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const { password, ...others } = user._doc;
    res.status(200).json(others);
  } catch (err) {
    res.status(500).json(err);
  }
});

export default router
