const crypto = require('crypto')
const Doctor = require('../models/Doctor');

const createDoctor = async (req, res) => {
    try {
        const payload = req.body;

        if(!payload || !payload.name){
            return res.status(500).json({message : "Doctor's name is not passed"})
        }

        const createdOn = Date.now();

        const drId = crypto.randomUUID().toString();

        payload.drId = drId;
        payload.createdOn = createdOn;

        const newDoctor = new Doctor(payload);
        const result = await newDoctor.save();

        res.status(201).json({ message: 'Doctor created successfully', data: result});


    } catch (error) {
        console.error('Error creating doctor:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const getAllDoctors = async(req, res) => {
    try {
        const doctors = await Doctor.find();
        res.status(200).json(doctors);
    } catch (error) {
        console.error('Error fetching doctors:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

const searchDoctors = async(req, res) => {
    try {
        const query = req.params.query;

        const doctors = await Doctor.find({ name : {$regex : query, $options: 'i'}});
    
        res.status(200).json({doctors});
    } catch (error) {
        console.log(error);
        res.status(500).json({message : error});
    }
}

module.exports = {createDoctor, getAllDoctors, searchDoctors};