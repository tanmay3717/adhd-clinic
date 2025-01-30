import mongoose, { Schema, Document } from 'mongoose';
import {Contact} from "./Contact";

export enum DiagnosisStatusEnum {
    Mild = "Mild",
    Moderate = "Moderate",
    Severe = "Severe"
}

export interface IPatient extends Document {
    fullName: string;
    dateOfBirth: Date;
    contact: Contact;
    diagnosisStatus: DiagnosisStatusEnum;
    notes: string;
}

const PatientSchema: Schema = new Schema({
    fullName: { type: String, required: true },
    dateOfBirth: { type: Date, required: true },
    contact: {
        email: { type: String, required: true },
        phone: { type: String, required: true }
    },
    diagnosisStatus: { type: String, enum: DiagnosisStatusEnum, required: true },
    notes: { type: String }
});

export const Patient = mongoose.model<IPatient>('Patient', PatientSchema);
