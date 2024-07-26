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


const FollowUser = async (req, res) => {
  try {
    const currentUserId = req.body.currentUserId; 
    const userToFollowId = req.params.id;

    if (!currentUserId) {
      return res.status(400).json({ message: "Current user ID is required" });
    }

    const userToFollow = await User.findById(userToFollowId);
    if (!userToFollow) {
      return res.status(404).json({ message: "User not found" });
    }

    const currentUser = await User.findById(currentUserId);
    if (!currentUser) {
      return res.status(404).json({ message: "Current user not found" });
    }

    if (userToFollow.followers.includes(currentUserId)) {
      return res.status(400).json({ message: "Already following this user" });
    }

    userToFollow.followers.push(currentUserId);
    await userToFollow.save();
    
    res.status(200).json({ message: "User followed" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const unfollowUser = async (req, res) => {
  try {
    const currentUserId = req.body.currentUserId; // Ensure you pass this in the request body
    const userToUnfollowId = req.params.id;

    if (!currentUserId) {
      return res.status(400).json({ message: "Current user ID is required" });
    }

    const userToUnfollow = await User.findById(userToUnfollowId);
    if (!userToUnfollow) {
      return res.status(404).json({ message: "User not found" });
    }

    const currentUser = await User.findById(currentUserId);
    if (!currentUser) {
      return res.status(404).json({ message: "Current user not found" });
    }

    if (!userToUnfollow.followers.includes(currentUserId)) {
      return res.status(400).json({ message: "Not following this user" });
    }

    userToUnfollow.followers = userToUnfollow.followers.filter(id => id.toString() !== currentUserId.toString());
    await userToUnfollow.save();
    
    res.status(200).json({ message: "User unfollowed" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
module.exports = { EditUser,GetUser,deleteUser,FollowUser,unfollowUser };

