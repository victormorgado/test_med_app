import React, { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import './ReportsLayout.css';


const ReportsLayout = () => {
    const [doctors, setDoctors] = useState([]);

    const doctorsTest = [
        {
            id: 1,
            name: "Dr. Jiao Yang",
            speciality: "Dentist"
        },
        {
            id: 2,
            name: "Dr. Jane Smith",
            speciality: "Cardiology"
        },
        {
            id: 3,
            name: "Dr. Denis Raj",
            speciality: "Dentist"
        }
    ];

    const loadDoctors = () => {
        setDoctors(doctorsTest);
    }

    useEffect(() => {
        loadDoctors();
    }, [])

  return (
    <div className="report-form-container">
        <div className="reports-text">
                <h2>Reports</h2>
            </div>
        <table className="report-form-table">
            <tr className="report-form-table-header">
                <th>Serial Number</th>
                <th>Doctor Name</th>
                <th>Doctor Speciality</th>
                <th>View Report</th>
                <th>Download Report</th>
            </tr>
            {doctors.length > 0 ? (
                    doctors.map(doctor => (
                        <>
                        <tr className="review-form-table-row" key={doctor.id}>
                            <td>{doctor.id}</td>
                            <td>{doctor.name}</td>
                            <td>{doctor.speciality}</td>
                            <td>
                                <a href={process.env.PUBLIC_URL + '/patient_report.pdf'} target="_blank">
                                    <button className="report-form-table-btn">
                                    <div>View Report</div>
                                    </button>
                                </a>
                            </td>
                            <td>
                                <a href={process.env.PUBLIC_URL + '/patient_report.pdf'} download>
                                    <button className="report-form-table-btn">
                                    <div>Download Report</div>
                                    </button>
                                </a>
                            </td>
                        </tr>
                        </>
                    ))
                    ) : (
                        <tr>
                            <td colSpan="5">No doctors found.</td>
                      </tr>
                    )}
        </table>
    </div>
    );

};

export default ReportsLayout;
