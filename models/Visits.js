const mongoose = require('mongoose');
const Schema = mongoose.Schema;
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
    location: String,
    gstNumber: String
};

const doctorInfo = {
    drId : String,
    name: String,
    speciality: String,
    clinicName : String,
    addressInfo : addressInfoModel,
    associatedMedicals: [AssociatedMedicalSchema],
}

const product = {
    name : String,
    code : String,
    division : String,
    group : String
}

const VisitSchema = new Schema({
    mrId: { type: String, required: true },
    visitId: { type: String, required: true, unique: true },
    mrInfo: mrInfo,
    doctorInfo: doctorInfo,
    visitedOn: { type: Date, required: true },
    feedback : String,
    attachments: [
        {
            fileName: String,
            fileId: String
        }
    ],
    location: PointSchema,
    products : [product]
})

const Visit = mongoose.model('Visit', VisitSchema);

module.exports = Visit;