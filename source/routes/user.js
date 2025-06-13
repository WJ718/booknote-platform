const express = require('express');
const router = express.Router();
const{login, logout, signup, renderSetting, 
    changeNick, changePassword, myPosts} = require('../controllers/user');

router.post('/login', login);
router.post('/signup', signup);
router.post('/logout', logout);

router.get('/setting', renderSetting);

router.post('/change-nick', changeNick);
router.post('/change-password', changePassword);

router.get('/my-posts', myPosts);

module.exports = router;