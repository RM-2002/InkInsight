import express from "express";
import bcrypt from 'bcrypt';

import User from "../models/User.js";

const router = express.Router();

//REGISTER
router.post("/register", async (req, res) => {
    try {
        // Check for empty fields
        if (!req.body.firstName || !req.body.lastName || !req.body.username || !req.body.email || !req.body.password) {
            return res.status(400).json("All fields are mandatory");
        }

        // Check if username already exists
        const existingUsername = await User.findOne({ username: req.body.username });
        if (existingUsername) {
            return res.status(400).json("Username already exists");
        }

        // Check if email already exists
        const existingEmail = await User.findOne({ email: req.body.email });
        if (existingEmail) {
            return res.status(400).json("Email already exists");
        }
        
        const salt = await bcrypt.genSalt(10);
        const hashedPass = await bcrypt.hash(req.body.password, salt);

        const newUser = new User({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            username: req.body.username,
            email: req.body.email,
            password: hashedPass,
        });
        const user = await newUser.save();
        res.status(200).json({message : "Registration successful" , ...user._doc});
    } catch (err) {
       // console.error(err);
        res.status(500).json(err);
    }
});



//LOGIN
router.post("/login", async (req, res) => {
    try {
        // Check for empty fields
        if (!req.body.username || !req.body.password) {
            return res.status(400).json("Username and password are mandatory");
        }

        const user = await User.findOne({ username: req.body.username });
        if (!user) {
            return res.status(400).json("Wrong credentials!");
        }

        const validated = await bcrypt.compare(req.body.password, user.password);
        if (!validated) {
            return res.status(400).json("Wrong credentials!");
        }

        const { password, ...record } = user._doc;
        res.status(200).json({message : "Login successful", ...record});
    } catch (err) {
        res.status(500).json(err);
    }
});

export default router;
