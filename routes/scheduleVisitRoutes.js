const express = require('express');
const scheduleVisitController = require('../controllers/scheduleVisitController');
const jwtMiddleware = require('../middleware/jwt.middleware');

const router = express.Router();
router.use(jwtMiddleware);

router.post('/add', scheduleVisitController.addSchedule);
router.get('/:mrId', scheduleVisitController.getAllSchedulesOfMR);
router.post('/bulkAdd', scheduleVisitController.bulkScheduleVisit);

module.exports = router;
