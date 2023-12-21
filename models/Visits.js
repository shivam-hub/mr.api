const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const doctorModel = require('../models/Doctor');
const userModel = require('../models/User');
const PointSchema = require('../models/PointSchema');
const addressInfoModel = require('../models/AddressInfo');

const mrInfo = {
    username : String,
    name : String,
    email : String,
    contactNo : String,
    userId : String
}


const AssociatedMedicalSchema = {
    name : String,
    addressInfo: addressInfoModel,
};

const doctorInfo = {
    drId : String,
    name: String,
    speciality: String,
    clinicName : String,
    addressInfo : addressInfoModel,
    associatedMedicals: [AssociatedMedicalSchema],
}



const VisitSchema = new Schema({
    mrId: { type: String, required: true },
    visitId: { type: String, required: true, unique: true },
    mrInfo: mrInfo,
    doctorInfo: doctorInfo,
    visitedOn: { type: Date, required: true },
    attachments: [
        {
            fileName: String,
            fileId: String
        }
    ],
    location: PointSchema
})

const Visit = mongoose.model('Visit', VisitSchema);

module.exports = Visit;