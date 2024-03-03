const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const doctorInfo = {
    drId: String,
    name: String,
    speciality: String,
    clinicName: String
}

const addedBy = {
    id: String,
    name: String
}

const ScheduleVisitSchema = new Schema({
    mrId: { type: String, required: true },
    scheduleId: { type: String, required: true, unique: true },
    doctorInfo: doctorInfo,
    isVisited: { type: Boolean, default: false },
    plannedVisitDate: { type: Date, required: true },
    createdOn: { type: Date },
    modifiedOn: { type: Date },
    priorty: { type: String },
    addedBy: addedBy
})

const ScheduleVisit = mongoose.model('ScheduleVisit', ScheduleVisitSchema);

module.exports = ScheduleVisit;