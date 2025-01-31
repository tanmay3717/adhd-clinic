import {Contact} from "./Contact";

export enum DiagnosisStatusEnum {
    Mild = "Mild",
    Moderate = "Moderate",
    Severe = "Severe"
}

export interface Patient {
    _id: string;
    fullName: string;
    dateOfBirth: Date;
    contact: Contact;
    diagnosisStatus: DiagnosisStatusEnum;
    notes: string;
}