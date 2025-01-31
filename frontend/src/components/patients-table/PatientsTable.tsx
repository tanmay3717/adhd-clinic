import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {Patient} from "../../models/Patient.ts";
import {strings} from "../../constants/Strings.tsx";
import "./PatientsTable.css"

const PatientsTable: React.FC = () => {
    const [patients, setPatients] = useState<Patient[]>([]);

    useEffect(() => {
        axios.get<Patient[]>('/patients')
            .then((response) => setPatients(response.data));
    }, []);

    const handleDelete = (id: string) => {
        axios.delete(`/patients/${id}`)
            .then(() => {
                setPatients(patients.filter(patient => patient._id !== id));
            });
    };

    const handleEdit = (patient: Patient) => {
        //todo
    }

    return (
        <table>
            <thead>
            <tr>
                <th>{strings.name}</th>
                <th>{strings.contact_info}</th>
                <th>{strings.diagnosis_status}</th>
                <th>{strings.actions}</th>
            </tr>
            </thead>
            <tbody>
            {patients.map(patient => (
                <tr key={patient._id}>
                    <td>{patient.fullName}</td>
                    <td>{patient.contact.email} / {patient.contact.phone}</td>
                    <td>{patient.diagnosisStatus}</td>
                    <td>
                        <button onClick={() => handleEdit(patient)}>{strings.edit}</button>
                        <button onClick={() => handleDelete(patient._id)}>{strings.delete}</button>
                    </td>
                </tr>
            ))}
            </tbody>
        </table>
    );
};

export default PatientsTable;
