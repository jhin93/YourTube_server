const express = require('express');
const router = express.Router();

const { authController } = require('../controller');

// * POST /auth/login
router.post('/login', authController.login);
// * POST /auth/logout
router.post('/logout', authController.logout);

module.exports = router;
