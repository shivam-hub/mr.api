const express = require('express');
const visitController = require('../controllers/visitController');
const jwtMiddleware = require('../middleware/jwtMiddleware');

const router = express.Router();
router.use(jwtMiddleware);

router.post('/add', visitController.addVisit);

module.exports = router;
