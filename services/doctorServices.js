const Doctor = require('../models/Doctor');
const upload = require('../middleware/multer.middleware')
const xlsx = require('xlsx');
const fs = require('fs');

const addDoctor = async (payload) => {
    try {
        if (!payload || !payload.name) {
            throw Error();
        }

        const createdOn = Date.now();
        const dt = new Date();

        const drId = generateDoctorId();

        payload.drId = drId;
        payload.createdOn = createdOn;

        const newDoctor = new Doctor(payload);
        const res = await newDoctor.save();
        return res;

    } catch (error) {
        throw error;
    }
}

const updateDoctor = async (payload) => {
    try {
        if (!payload || !payload.name) {
            throw Error();
        }

        const res = Doctor.updateOne({ drId: payload.drId }, { $set: payload });
        return res;

    } catch (error) {
        throw error;
    }
}

const getDoctorById = async (drId) => {
    try {
        const res = Doctor.findOne({ drId: drId });
        return res;
    } catch (error) {

    }
}

// const BulkAddFromExcel = async (req) => {
//     return new Promise((resolve, reject) => {
//         upload(req, null, async (err) => {
//             try {
//                 if (err) {
//                     throw new Error('File upload failed');
//                 }

//                 if (!req.file) {
//                     throw new Error('No file uploaded');
//                 }

//                 const fileExtension = req.file.originalname.split('.').pop().toLowerCase();
//                 let jsonData;

//                 if (fileExtension === 'xlsx') {
//                     const workbook = xlsx.readFile(req.file.path);
//                     const sheetName = workbook.SheetNames[0];
//                     const sheet = workbook.Sheets[sheetName];
//                     jsonData = xlsx.utils.sheet_to_json(sheet);
//                 } else {
//                     throw new Error('Unsupported file format');
//                 }

//                 // Clean up the uploaded file after processing
//                 fs.unlinkSync(req.file.path);

//                 if (!jsonData || !Array.isArray(jsonData) || jsonData.length === 0) {
//                     throw new Error('No valid data found in the file');
//                 }

//                 const bulkAddDoctor = mapJsonToDoctorSchema(jsonData);

//                 if (bulkAddDoctor.length > 0) {
//                     const res = await Doctor.insertMany(bulkAddDoctor);
//                     console.log('Bulk save result:', res);
//                     resolve(true); // Indicate success
//                 } else {
//                     console.log('No valid doctors to add');
//                     resolve(false); // Indicate failure
//                 }
//             } catch (error) {
//                 console.error('Error in BulkAddFromExcel:', error);
//                 reject(error);
//             }
//         });
//     });
// };

const BulkAddFromExcel = async (req) => {
    return new Promise((resolve, reject) => {
        upload(req, null, async (err) => {
            try {
                if (err) {
                    throw new Error('File upload failed');
                }

                if (!req.file) {
                    throw new Error('No file uploaded');
                }

                const fileExtension = req.file.originalname.split('.').pop().toLowerCase();
                let jsonData;

                if (fileExtension === 'xlsx') {
                    const workbook = xlsx.readFile(req.file.path);
                    const sheetName = workbook.SheetNames[0];
                    const sheet = workbook.Sheets[sheetName];
                    jsonData = xlsx.utils.sheet_to_json(sheet);
                } else {
                    throw new Error('Unsupported file format');
                }

                fs.unlinkSync(req.file.path);

                if (!jsonData || !Array.isArray(jsonData) || jsonData.length === 0) {
                    throw new Error('No valid data found in the file');
                }

                const headerMapping = {
                    "Address Line 1": "addressLine1",
                    "Address Line 2": "addressLine1",
                    "Name": "name",
                    "Region": "region",
                    "State": "state",
                    "City": "city",
                    "Pincode": "pincode",
                    "Registeration Number" : "regNo",
                    "Clinic Name": "clinicName",
                  
                };

                const mappedJsonData = jsonData.map((row) => {
                    const mappedRow = {};
                    for (const [headerText, key] of Object.entries(headerMapping)) {
                        if (row.hasOwnProperty(headerText)) {
                            mappedRow[key] = row[headerText];
                        }
                    }
                    return mappedRow;
                });

                const bulkAddDoctor = mapJsonToDoctorSchema(mappedJsonData);

                if (bulkAddDoctor.length > 0) {
                    const res = await Doctor.insertMany(bulkAddDoctor);
                    console.log('Bulk save result:', res);
                    resolve(true);
                } else {
                    console.log('No valid doctors to add');
                    resolve(false);
                }
            } catch (error) {
                console.error('Error in BulkAddFromExcel:', error);
                reject(error);
            }
        });
    });
};



const mapJsonToDoctorSchema = (jsonData) => {
    return jsonData
        .filter(jsonData => jsonData.name && jsonData.name.trim() !== '' && jsonData.regNo && jsonData.regNo.trim() !== '')
        .map(jsonData => mapJsonToDoctor(jsonData));
}

const mapJsonToDoctor = (jsonData) => {
    const mappedDoctor = {
        addressInfo: {
            addressline1: jsonData.addressLine1 || '',
            addressline2: jsonData.addressLine2 || '',
            city: jsonData.city || '',
            region: jsonData.region || '',
            state: jsonData.state || '',
            pincode: jsonData.pincode || ''
        },
        drId: generateDoctorId(),
        name: jsonData.name || '',
        createdOn: Date.now(),
        modifiedOn: Date.now(),
        regNo: jsonData.regNo || '',
        speciality: jsonData.speciality || '',
        clinicName: jsonData.clinicName || '',
    };

    return mappedDoctor;
}

const generateDoctorId = () => {
    const dt = new Date();
    const randomSuffix = Math.floor(Math.random() * 1000); 
    return `D${String(dt.getDate()).padStart(2, '0')}${String(dt.getMonth() + 1).padStart(2, '0')}${dt.getFullYear()}${String(dt.getHours()).padStart(2, '0')}${String(dt.getMinutes()).padStart(2, '0')}${String(randomSuffix).padStart(3, '0')}`;
};


module.exports = { addDoctor, updateDoctor, getDoctorById, BulkAddFromExcel };