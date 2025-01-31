import express, {Request, Response} from "express";
import {IPatient, Patient} from "../models/Patient";

const patientRouter = express.Router();

// Create new patient
patientRouter.post('/', async (req: Request<{}, {}, IPatient>, res: any) => {
    const { fullName, dateOfBirth, contact, diagnosisStatus, notes } = req.body;

    if (!fullName) {
        return res.status(400).json({ message: 'Full name must be provided' });
    }
    if (!dateOfBirth) {
        return res.status(400).json({ message: 'Date of birth must be provided' });
    }
    if (!contact.email) {
        return res.status(400).json({ message: 'Email must be provided' });
    }
    if (!contact.phone) {
        return res.status(400).json({ message: 'Phone number must be provided' });
    }
    if (!diagnosisStatus) {
        return res.status(400).json({ message: 'Diagnosis status must be provided' });
    }

    try {
        const newPatient = new Patient({
            fullName,
            dateOfBirth,
            contact,
            diagnosisStatus,
            notes
        });
        await newPatient.save();
        res.status(201).json(newPatient);
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
});

// Get all patients
patientRouter.get('/', async (req: Request, res: Response) => {
    try {
        const allPatients = await Patient.find();
        res.status(200).json(allPatients);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
});

// Update a patient
patientRouter.put('/:id', async (req: Request<{id: string}, {}, IPatient>, res: any) => {
    try {
        const patient = await Patient.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!patient) {
            return res.status(404).json({ message: 'Patient not found' });
        }
        res.status(200).json(patient);
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
});

// Delete a patient
patientRouter.delete('/:id', async (req: Request<{id: string}, {}, IPatient>, res: any) => {
    try {
        const patient = await Patient.findByIdAndDelete(req.params.id);
        if (!patient) {
            return res.status(404).json({ message: 'Patient not found' });
        }
        res.status(204).send();
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
});

export { patientRouter as patientRouter };
