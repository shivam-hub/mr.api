const express = require('express');
const scheduleVisitController = require('../controllers/scheduleVisitController');
const jwtMiddleware = require('../middleware/jwtMiddleware');

const router = express.Router();
router.use(jwtMiddleware);

router.post('/add', scheduleVisitController.addSchedule);
router.get('/:mrId', scheduleVisitController.getAllSchedulesOfMR);

module.exports = router;
