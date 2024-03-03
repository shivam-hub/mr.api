const ScheduleVisit = require('../models/ScheduleVisitModel');
const scheduledVisitService = require('../services/scheduleVisitService');

const addSchedule = async (req, res) => {
    try {
        const payload = req.body;

        const result = scheduledVisitService.add(payload);
        
        res.status(200).json(result);

    } catch (error) {
        console.log('Error scheduling visit: ', error);
        res.status(500).json({ message: 'Internal Server error' });
    }
}

const getAllSchedulesOfMR = async(req, res) => {
    try {
        const mrId = req.params.mrId;
        const scheduledVisit = await ScheduleVisit.find({mrId : mrId});

        res.status(200).json({scheduledVisit});

    } catch (error) {
        res.status(500).json({ message: 'Internal Server error' });
    }
}


const bulkScheduleVisit = async(req, res) => {
    try {
        const payload = req.body;

        if (!payload || !Array.isArray(payload)) {
            res.status(500).json({ message: 'Please provide all required info' });
        }

        const count = 0;

        payload.forEach(async schedule => {
            let resp = await scheduledVisitService.add(schedule);
            if(resp.status === 200) count++;
        });

        const result = {
            message :  `${count} visit scheduled successfully`
        }
        res.status(200).json(result);

    } catch (error) {
        res.status(500).json({ message: 'Internal Server error' });
    }
}

module.exports = { addSchedule, getAllSchedulesOfMR, bulkScheduleVisit };

