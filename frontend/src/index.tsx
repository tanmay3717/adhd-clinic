import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import PatientsTable from "./components/patients-table/PatientsTable.tsx";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <PatientsTable />
  </React.StrictMode>
);
