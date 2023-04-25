'use strict';
// postController

const postModel = require('../Models/postModel');
const {validationResult} = require('express-validator');

const getPostList = async (req, res) =>{
    try {
        const posts = await postModel.getAllPosts();
        
        res.json(posts);
    } catch (error){
        res.status(500).json({error: 500, message: error.message});
    }
};

const getPost = async (req, res) => {
    //console.log(req.params);
    const postId = Number(req.params.id);
    if(!Number.isInteger(postId)){
        res.status(400).json({error:500, message: 'invalid id'});
        return;
    }
    try{
        const [post] = await postModel.getPostById(postId);
        res.json(post)
    } catch(error){
        res.status(404).json({message: 'Post not found.'});
    }
};

const postPost = async (req, res) =>{
    //console.log('posting a picture', req.body, req.file);
    if(!req.file){
        res.status(400).json({
            status: 400,
            message: 'Invalid or missing image file'
        });
        return;
    }
    const validationErrors = validationResult(req);
    if(!validationErrors.isEmpty()){
        res.status(400).json({
            status: 400,
            errors: validationErrors.array(), 
            message: 'Invalid data'
        });
        return;
    }
    
    const newPost = req.body;
    try{
        const result = await postModel.insertPost(newPost);
        res.status(201).json({message: 'new post added'});
    }catch(error){
        res.status(500).json({error: 500, message: error.message})
    }
    
};

const deletePost = async (req, res) => {
    //console.log('deleting a post', req.param.id)
    try{
        const result = await postModel.deletePost(req.params.id);
        res.status(200).json({message: 'post deleted'});
    } catch(error){
        res.status(500).json({error:500, message: error.message});
    }
};

const postController = {getPostList, getPost, postPost, deletePost };
module.exports = postController;