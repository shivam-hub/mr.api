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

module.exports = { addDoctor };