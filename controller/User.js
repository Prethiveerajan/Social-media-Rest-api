const express = require('express');
const User = require('../models/userModel')

const get =  (req, res) => {
    res.json({ message: 'Welcome to the API!' });
}

const GetUser = async (req,res) =>{
    const newUser = new User({
        userName: req.body.userName,
        email: req.body.email,
        password: req.body.password
    })
    try{
        const savedUser = await newUser.save()
        res.status(200).json(savedUser)
    }
    catch(error){
        res.status(400).json({message: error.message})
    }
}
const DeleteUser = async (req,res)=>{
    try{
        const user = await User.findByIdAndDelete(req.params.id)
        if(!user) return res.status(400).json({message: 'User not found'})
        res.status(200).json({message: 'User deleted successfully'})
    }
    catch{
        res.status(400).json({message:"user can't be deleted"})
    }

}

module.exports = {get,GetUser,DeleteUser};