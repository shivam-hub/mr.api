const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const addressInfoModel = require('../models/AddressInfo');


const AssociatedMedicalSchema = {
    name : String,
    location: String,
    gstNumber: String
};

const doctorInfo = {
    drId: String,
    name: String,
    speciality: String,
    clinicName: String,
    addressInfo: addressInfoModel,
    associatedMedicals: [AssociatedMedicalSchema],
}

const ScheduleVisitSchema = new Schema({
    mrId: { type: String, required: true },
    scheduleId: { type: String, required: true, unique: true },
    doctorInfo: doctorInfo,
    isVisited: { type: Boolean, default: false },
    plannedVisitDate: { type: Date, required: true },
    plannedVisitTime: { type: Date, required: true },
    createdOn: { type: Date },
    modifiedOn: { type: Date },
    priorty: { type: String }
})

const ScheduleVisit = mongoose.model('ScheduleVisit', ScheduleVisitSchema);

module.exports = ScheduleVisit;