const crypto = require('crypto')
const Doctor = require('../models/Doctor');
const doctorService = require('../services/doctorServices');

const createDoctor = async (req, res) => {
    try {
        const payload = req.body;

        const r = await doctorService.addDoctor(payload);

        res.status(201).json({ message: 'Doctor created successfully', data: r});


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