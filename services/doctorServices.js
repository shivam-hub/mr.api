const crypto = require('crypto')
const Doctor = require('../models/Doctor');

const addDoctor = async (payload) => {
    try {
        if (!payload || !payload.name) {
            throw Error();
        }

        const createdOn = Date.now();

        const drId = crypto.randomUUID().toString();

        payload.drId = drId;
        payload.createdOn = createdOn;

        const newDoctor = new Doctor(payload);
        const res = await newDoctor.save();
        return res;

    } catch (error) {
        throw error;
    }
}

const updateDoctor = async(payload) => {
    try {
        if (!payload || !payload.name) {
            throw Error();
        }

        const res = Doctor.updateOne({ drId : payload.drId}, {$set : payload});
        return res;

    } catch (error) {
        throw error;
    }
}

const getDoctorById = async(drId) => {
    try{
        const res = Doctor.findOne({drId : drId});
        return res;
    }catch(error){

    }
}

module.exports = { addDoctor, updateDoctor, getDoctorById };