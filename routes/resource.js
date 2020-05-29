const express = require('express');
const router = express.Router();

const { resourceController } = require('../controller');

// * GET /resource
router.get('/', resourceController.resource);
// * POST /resource/search
router.post('/search', resourceController.search);

module.exports = router;
