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
    .get(seenController.getSeenList)
    .post(upload.single('seen') , 
        seenController.postSeen
    )
    .put(
        seenController.putSeen
    );

router.route('/:id')
    .get(seenController.getSeen)
    .delete(seenController.deleteSeen);

module.exports = router;