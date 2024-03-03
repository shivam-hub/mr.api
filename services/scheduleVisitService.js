const ScheduleVisit = require('../models/ScheduleVisitModel');

const add = async (payload) => {
    try {
        if (!payload || !payload.plannedVisitDate) {
            throw Error();
        }

        const plannedVisitDate = Date.parse(payload.plannedVisitDate);


        const mrId = payload?.mrId ?? '';
        const createdOn = Date.now();
        const dt = new Date();

        const scheduleId = `S${String(dt.getDate()).padStart(2, '0')}${String(dt.getMonth() + 1).padStart(2, '0')}${dt.getFullYear()}${String(dt.getHours()).padStart(2,'0')}${String(dt.getMinutes()).padStart(2,'0')}`;
        
        payload.mrId = mrId;
        payload.createdOn = createdOn;
        payload.scheduleId = scheduleId;
        payload.plannedVisitDate = plannedVisitDate;

        const result = await new ScheduleVisit(payload).save();
        return result;

    } catch (error) {
        throw error;
    }
}

const updateVisit = async(payload) => {
    try {
        if(!payload || !payload.scheduleId){
            throw Error();
        }

        const result = await ScheduleVisit.updateOne({ scheduleId: payload.scheduleId}, {$set : payload});
        return result;

    } catch (error) {
        throw error;
    }
}


const getVisit = async (scheduleId) => {
    try {
        if(!scheduleId || scheduleId === ''){
            throw Error();
        }

        const res = await ScheduleVisit.findOne({scheduleId: scheduleId});
        return res;

    } catch (error) {
        throw Error();
    }
}

module.exports = { add, updateVisit, getVisit }
