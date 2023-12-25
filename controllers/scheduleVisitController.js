const crypto = require('crypto');
const ScheduleVisit = require('../models/ScheduleVisitModel');


const addSchedule = async (req, res) => {
    try {
        const payload = req.body;

        if (!payload || !payload.mrId || !payload.plannedVisitDate || !payload.plannedVisitTime) {
            res.status(500).json({ message: 'Please provide all required info' });
        }

        const timeComponents = payload.plannedVisitTime.match(/(\d+):(\d+) (AM|PM)/);
        const plannedVisitDate = Date.parse(payload.plannedVisitDate);
        const parsedPlannedVisitTime = new Date(plannedVisitDate); // Get the current date

        if (timeComponents) {
            let hours = parseInt(timeComponents[1]);
            const minutes = parseInt(timeComponents[2]);
            const period = timeComponents[3].toUpperCase();

            if (period === 'PM' && hours !== 12) {
                hours += 12;
            } else if (period === 'AM' && hours === 12) {
                hours = 0;
            }

            parsedPlannedVisitTime.setHours(hours, minutes, 0, 0);
            console.log(parsedPlannedVisitTime); 
        } else {
            throw Error('Time incorrect');
        }

        const createdOn = Date.now();
        const scheduleId = crypto.randomUUID().toString();

        payload.createdOn = createdOn;
        payload.scheduleId = scheduleId;
        payload.plannedVisitDate = plannedVisitDate;
        payload.plannedVisitTime = parsedPlannedVisitTime;

        const result = await new ScheduleVisit(payload).save();
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
        
    }
}

module.exports = { addSchedule, getAllSchedulesOfMR };

