const express = require("express");
const User = require("../models/userModel");
const bcrypt = require("bcrypt");

const deleteUser = async (req,res)=>{
    if(req.body.userId === req.params.id|| req.body.isAdmin) {
         try {
      const user = await User.findByIdAndDelete(req.params.id, { $set: req.body }, { new: true });
      res.status(200).json({ message: "User Deleted" });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  } else {
    return res.status(403).json({ message: "Not your account" });
  }
};



const EditUser = async (req, res) => {
  if (req.body.userId === req.params.id || req.user.isAdmin) {
    if (req.body.password) {
      try {
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(req.body.password, salt);
      } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Error hashing password" });
      }
    }
    try {
      const user = await User.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
      res.status(200).json({ message: "User updated", user });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  } else {
    return res.status(403).json({ message: "Not your account" });
  }
};

module.exports = { EditUser ,deleteUser  };
