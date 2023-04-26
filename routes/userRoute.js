'use strict';

const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const {body} = require('express-validator');


router.route('/')
    .get(userController.getUserList)
    .post(
        body('FirstName').isAlphanumeric().isLength({min: 1, max: 30}).escape().trim(),
        body('LastName').isAlphanumeric().isLength({min: 1, max: 30}).escape().trim(),
        body('email').isEmail(),
        body('password').isAlphanumeric().isLength({min: 8}),
        userController.postUser
    )
    .put(
        body('FirstName').isAlphanumeric().isLength({min: 1, max: 30}).escape().trim(),
        body('LastName').isAlphanumeric().isLength({min: 1, max: 30}).escape().trim(),
        body('email').isEmail(),
        body('password').isAlphanumeric().isLength({min: 8}),
        userController.putUser
    )
    .delete(userController.deleteUser);
router.get('/token', userController.checkToken);
router.get('/:userId', userController.getUser);
    
module.exports = router;