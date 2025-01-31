import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {Patient} from "../../models/Patient.ts";
import {strings} from "../../constants/Strings.tsx";
import "./PatientsTable.css"
import Modal from "../modal/Modal.tsx";
import CreateOrUpdatePatientForm from "../create-update-patient-form/CreateOrUpdatePatientForm.tsx";

const PatientsTable: React.FC = () => {
    const [patients, setPatients] = useState<Patient[]>([]);
    const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
    const [showModal, setShowModal] = useState<boolean>(false);

    useEffect(() => {
        axios.get<Patient[]>('/patients')
            .then((response) => setPatients(response.data));
    }, [showModal]);

    const handleDelete = (id: string) => {
        axios.delete(`/patients/${id}`)
            .then(() => {
                setPatients(patients.filter(patient => patient._id !== id));
            });
    };

    const handleEdit = (patient: Patient) => {
        setSelectedPatient(patient);
        setShowModal(true);
    }

    const resetForm = () => {
        setShowModal(false);
        setSelectedPatient(null);
    }

    return (
        <div>
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
            <button onClick={() => setShowModal(true)}>{strings.create_new_patient}</button>
            {showModal && (
                <Modal isOpen={showModal} onClose={resetForm}>
                    <CreateOrUpdatePatientForm patient={selectedPatient} onSubmit={resetForm} />
                </Modal>
            )}
        </div>
    );
};

export default PatientsTable;
