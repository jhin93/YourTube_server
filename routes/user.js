const express = require('express');
const router = express.Router();

const { userController } = require('../controller');

// * POST /user/auth
router.post('/auth', userController.auth);

// * POST /user/deauth
router.post('/deauth', userController.deauth);

module.exports = router;
