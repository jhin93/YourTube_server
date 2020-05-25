const express = require('express');
const router = express.Router();

const { videoController } = require('../controller');

// * GET /resource
router.get('/', videoController.get);

// * POST /user/signout
router.post('/', videoController.post);

module.exports = router;
