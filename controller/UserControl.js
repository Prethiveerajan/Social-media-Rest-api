

const User = require("../models/userModel");
const bcrypt = require("bcrypt");

const EditUser = async (req, res) => {
  try {
    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      req.body.password = await bcrypt.hash(req.body.password, salt);
    }
    
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User updated", user });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "User deleted" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const GetUser = async(req,res)=>{
  try{
    const user = await User.findById(req.params.id);
    if(!user) return res.status(404).json({ message: "User not found" });
    res.status(200).json(user);
  }
  catch(error){
      res.status(500).json({ message: error.message });
    }

}

module.exports = { EditUser,GetUser,deleteUser };

