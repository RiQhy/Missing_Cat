'use strict';

const express = require('express');
const multer = require('multer');
const router = express.Router();
const postController = require('../controllers/postController');
const {body} = require('express-validator');

const fileFilter = (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/png'];
    if(allowedTypes.includes(file.mimetype)){
        cb (null, true);
    } else {
        cb(null, false);
    }
};

const upload = multer({dest: 'img/', fileFilter});

router.route('/')
    .get(postController.getPostList)
    .post(upload.single('post') , 
        body('name').isAlphanumeric().isLength({min: 1, max: 30}).escape().trim(),
        body('location').isAlphanumeric().isLength({min: 1, max: 30}).escape().trim(),
        body('date').isDate(),
        body('user_id').isInt({min:1}),
        postController.postPost
    );

router.route('/:id')
    .get(postController.getPost)
    .delete(postController.deletePost);

module.exports = router;