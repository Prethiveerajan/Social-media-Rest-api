const express = require("express");
const User = require("../models/userModel");
const bcrypt = require("bcrypt");

const login = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (validPassword) {
      return res.status(200).json({ message: `Welcome back ${user.userName}` });
    } else {
      return res.status(400).json({ message: "Invalid password" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const register = async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    const newUser = new User({
      userName: req.body.userName,
      email: req.body.email,
      password: hashedPassword,
    });

    const savedUser = await newUser.save();
    res.status(200).json(savedUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};



module.exports = { register, login ,};
