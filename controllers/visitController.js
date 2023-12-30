const crypto = require('crypto')
const Visit = require('../models/Visits');
const doctorService = require('../services/doctorServices');

const addVisit = async(req, res) => {
    try {
        const payload = req.body;

        if(!payload || !payload.mrId){
            res.status(500).json({message : "Payload is null"})
        }

        if(payload.doctorInfo && (!payload.doctorInfo.drId || payload.doctorInfo.drId === "")){
            const docInfo = payload.doctorInfo;
            const res = await doctorService.addDoctor(docInfo);
            payload.docInfo = res;
        }

        const visitedOn = Date.now();
        const visitId = crypto.randomUUID().toString();

        payload.visitedOn = visitedOn;
        payload.visitId = visitId;

        const result = await new Visit(payload).save();

        res.status(200).json({message : "Visit logged successfully", data : result});

    } catch (error) {
        console.error('Error logging visit:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = { addVisit };