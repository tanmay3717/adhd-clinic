import express, {Request, Response} from "express";
import {IPatient, Patient} from "../models/Patient";

const patientRouter = express.Router();

// Create new patient
patientRouter.post('/', async (req: Request<{}, {}, IPatient>, res: Response) => {
    const { fullName, dateOfBirth, contact, diagnosisStatus, notes } = req.body;

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

export { patientRouter as patientRouter };
