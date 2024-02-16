const crypto = require('crypto')
const Visit = require('../models/Visits');
const doctorService = require('../services/doctorServices');
const { uploadImage } = require('./fileController');

const addVisit = async (req, res) => {
    try {
        const payload = req.body;

        if (!payload || !payload.mrId) {
            res.status(500).json({ message: "Payload is null" })
        }

        if (payload.doctorInfo && (!payload.doctorInfo.drId || payload.doctorInfo.drId === "")) {
            const docInfo = payload.doctorInfo;
            const res = await doctorService.addDoctor(docInfo);
            payload.doctorInfo = res;
        }
        else if (payload.doctorInfo.drId !== "") {
            const docInfo = payload.doctorInfo;
            await doctorService.updateDoctor(docInfo);
            const res = await doctorService.getDoctorById(docInfo.drId);
            payload.doctorInfo = res;
        }

        const visitedOn = Date.now();
        const visitId = crypto.randomUUID().toString();

        payload.visitedOn = visitedOn;
        payload.visitId = visitId;

        const base64Image = payload.attachments[0].fileName;
        let filePath = '';

        if (base64Image && base64Image !== '') {
            filePath = uploadImage({ base64Image });
        }

        if(filePath != null && filePath !== ''){
            payload.attachments[0].filePath = filePath;
        }

        const result = await new Visit(payload).save();

        res.status(200).json({ message: "Visit logged successfully", data: result });

    } catch (error) {
        console.error('Error logging visit:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const visitsAdvancedSearch = (req, res) => {

}

const getAllVisits = async (req, res) => {
    try {
        const visits = await Visit.find();
        res.status(200).json(visits);
    } catch (error) {
        console.error('Error fetching visits:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = { addVisit, getAllVisits };