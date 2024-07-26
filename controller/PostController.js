const express = require('express');
const mongoose = require('mongoose');
const Post = require('../models/PostModel');

// Create post
const createPost = async (req, res) => {
    const post = new Post({
        userId: req.body.userId,
        desc: req.body.desc,
        image: req.body.image
    });
    try {
        const savedPost = await post.save();
        res.status(201).json({ message: "Created new post and saved", post: savedPost });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

// Update post
const updatePost = async (req, res) => {
    const id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: "Invalid post ID" });
    }

    try {
        const updatedPost = await Post.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedPost) return res.status(404).json({ message: "Post not found" });
        res.status(200).json({ message: "Post updated", post: updatedPost });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// Delete post
const deletePost = async (req, res) => {
    const id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: "Invalid post ID" });
    }

    try {
        const deletedPost = await Post.findByIdAndDelete(id);
        if (!deletedPost) return res.status(404).json({ message: "Post not found" });
        res.status(200).json({ message: "Post deleted" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// Like post
const likePost = async (req, res) => {
    const id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: "Invalid post ID" });
    }

    try {
        const post = await Post.findById(id);
        if (!post) return res.status(404).json({ message: "Post not found" });

        if (!post.likes.includes(req.body.userId)) {
            post.likes.push(req.body.userId);
            await post.save();
            return res.status(200).json({ message: "Liked post" });
        } else {
            return res.status(400).json({ message: "You have already liked this post" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// Dislike post
const dislikePost = async (req, res) => {
    const id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: "Invalid post ID" });
    }

    try {
        const post = await Post.findById(id);
        if (!post) return res.status(404).json({ message: "Post not found" });

        if (!post.dislikes) post.dislikes = []; // Initialize dislikes array if it doesn't exist

        if (!post.dislikes.includes(req.body.userId)) {
            post.dislikes.push(req.body.userId);
            await post.save();
            return res.status(200).json({ message: "Disliked post" });
        } else {
            return res.status(400).json({ message: "You have already disliked this post" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// Get post
const getPost = async (req, res) => {
    const id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: "Invalid post ID" });
    }

    try {
        const post = await Post.findById(id);
        if (!post) return res.status(404).json({ message: "Post not found" });
        res.status(200).json({ post });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = { createPost, updatePost, deletePost, likePost, dislikePost, getPost };
