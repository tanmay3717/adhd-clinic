import React, { useState } from 'react';
import axios from 'axios';
import {Patient} from "../../models/Patient.ts";
import "./CreateOrUpdatePatientForm.css"
import {strings} from "../../constants/Strings.tsx";

interface CreateOrUpdatePatientFormProps {
    patient?: Patient | null;
    onSubmit: () => void;
}

const CreateOrUpdatePatientForm: React.FC<CreateOrUpdatePatientFormProps> = (props: CreateOrUpdatePatientFormProps) => {
    const {patient, onSubmit} = props;
    const [fullName, setFullName] = useState(patient?.fullName || '');
    const [dateOfBirth, setDateOfBirth] = useState(patient?.dateOfBirth?.toString().split("T")[0] || "");
    const [email, setEmail] = useState(patient?.contact.email || '');
    const [phone, setPhone] = useState(patient?.contact.phone || '');
    const [diagnosisStatus, setDiagnosisStatus] = useState(patient?.diagnosisStatus || 'Mild');
    const [notes, setNotes] = useState(patient?.notes || '');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const newPatientValues = { fullName, dateOfBirth, contact: { email, phone }, diagnosisStatus, notes };
        if (patient) {
            await axios.put(`/patients/${patient._id}`, newPatientValues);
        } else {
            await axios.post('/patients', newPatientValues);
        }
        onSubmit();
    };

    return (
        <form onSubmit={handleSubmit}>
            <input value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder="Full Name" />
            <input value={dateOfBirth} onChange={(e) => setDateOfBirth(e.target.value)} type="date" />
            <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
            <input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Phone" />
            <select value={diagnosisStatus} onChange={(e) => setDiagnosisStatus(e.target.value)}>
                <option value="Mild">Mild</option>
                <option value="Moderate">Moderate</option>
                <option value="Severe">Severe</option>
            </select>
            <textarea value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Notes"></textarea>
            <button type="submit">{patient ? strings.update : strings.create}</button>
        </form>
    );
};

export default CreateOrUpdatePatientForm;
