const express = require('express');
const { getAllUsers, registerController, loginController } = require('../controller/userController');

const router = express.Router();

//getAllUser || get
router.get('/all-users', getAllUsers);

//create user || post
router.post('/register', registerController);

//login || post
router.post('/login', loginController);

module.exports = router;
