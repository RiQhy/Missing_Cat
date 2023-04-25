'use strict';
// seenController

const seenModel = require('../Models/seenModel');
const {validationResult} = require('express-validator');

const getSeenList = async (req, res) =>{
    try {
        const seenImages = await seenModel.getAllSeenImages();
        
        res.json(seenImages);
    } catch (error){
        res.status(500).json({error: 500, message: error.message});
    }
};

const getSeen = async (req, res) => {
    //console.log(req.params);
    const seenId = Number(req.params.id);
    if(!Number.isInteger(seenId)){
        res.status(400).json({error:500, message: 'invalid id'});
        return;
    }
    try{
        const [seen] = await seenModel.getSeenById(seenId);
        res.json(seen)
    } catch(error){
        res.status(404).json({message: 'Post not found.'});
    }
};

const postSeen = async (req, res) =>{
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
    
    const newSeen = req.body;
    try{
        const result = await seenModel.insertPost(newSeen);
        res.status(201).json({message: 'new post added'});
    }catch(error){
        res.status(500).json({error: 500, message: error.message})
    }
    
};

const deleteSeen = async (req, res) => {
    //console.log('deleting a post', req.param.id)
    try{
        const result = await postModel.deleteSeen(req.params.id);
        res.status(200).json({message: 'post deleted'});
    } catch(error){
        res.status(500).json({error:500, message: error.message});
    }
};

const seenController = {getSeenList, getSeen, postSeen, deleteSeen };
module.exports = seenController;