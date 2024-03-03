const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const addressInfoModel = require('../models/AddressInfo');

const AssociatedMedicalSchema = {
    name : String,
    location: String,
    gstNumber: String
};

const associatedMR = {
    name : String,
    id : String
}

const focusedProducts = {
    name : String,
    code : String,
    division : String,
    group : String,
    units : Number,
    competitor : String,
    focusId : Number
}

const DoctorSchema = new Schema({
    drId: { type: String, required: true, unique: true },
    name: { type: String, required: true, unique: true },
    createdOn: { type: String},
    modifiedOn: { type: String},
    regNo : {type : String },
    addressInfo: addressInfoModel,
    speciality: { type: String},
    clinicName: { type: String },
    associatedMedicals: [AssociatedMedicalSchema],
    associatedMR : associatedMR,
    products : [focusedProducts]
});

const Doctor = mongoose.model('Doctor', DoctorSchema);

module.exports = Doctor;
