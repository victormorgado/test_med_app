import React, { useEffect, useState } from 'react';
import Popup from 'reactjs-popup';
import { v4 as uuidv4 } from 'uuid';
import 'reactjs-popup/dist/index.css';
import './ReviewForm.css';
import GiveReviews from './GiveReviews';


const ReviewForm = () => {
    const [doctors, setDoctors] = useState([]);
    const [reviews, setReviews] = useState([]);

    const [showModal, setShowModal] = useState(false);
    const [selectedDoctorId, setSelectedDoctorId] = useState(null);

    

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

    const handleFormSubmit = (reviewData) => {
        const newReview = {
          id: uuidv4(),
          ...reviewData,
        };
        const updatedReviews = [...reviews, newReview];
        setReviews(updatedReviews);
        setShowModal(false);
      };

    const handleReviewButtonClick = (doctorId) => {
        setSelectedDoctorId(doctorId);
        setShowModal(true);
    };

  return (
    <div className="review-form-container">
        <div className="reviews-text">
                <h2>Reviews</h2>
            </div>
        <table className="review-form-table">
            <tr className="review-form-table-header">
                <th>Serial Number</th>
                <th>Doctor Name</th>
                <th>Doctor Speciality</th>
                <th>Provide feedback</th>
                <th>Review Given</th>
            </tr>
            {doctors.length > 0 ? (
                    doctors.map(doctor => (
                        <>
                        <tr className="review-form-table-row" key={doctor.id}>
                            <td>{doctor.id}</td>
                            <td>{doctor.name}</td>
                            <td>{doctor.speciality}</td>
                            <td>
                            <div className="doctor-card-options-container">
                            <Popup
                                style={{ backgroundColor: '#FFFFFF' }}
                                trigger={
                                    <button
                                    className="review-form-table-btn"
                                    disabled={reviews.some((review) => review.doctorId === doctor.id)}
                                    onClick={() => handleReviewButtonClick(doctor.id)}
                                    >
                                    {reviews.some((review) => review.doctorId === doctor.id) ? (
                                        <div>-</div>
                                    ) : (
                                        <div>Review</div>
                                    )}
                                    </button>
                                }
                                modal
                                open={showModal && selectedDoctorId === doctor.id}
                                onClose={() => setShowModal(false)}
                                >
                                {(close) => (
                                    <div className="doctorbg" style={{ height: '100vh', overflow: 'scroll' }}>
                                    {reviews.some((review) => review.doctorId === doctor.id) ? (
                                        <h3 style={{ textAlign: 'center' }}>Reviewed!</h3>
                                    ) : (
                                        <GiveReviews doctorId={doctor.id} onSubmit={handleFormSubmit} />
                                    )}
                                    </div>
                                )}
                                </Popup> 
                            </div>
                            </td>
                            <td style={{maxWidth: '300px'}}>
                                {reviews.some((review) => review.doctorId === doctor.id) ? (
                                    <div style={{fontSize: '12px'}}>{reviews.find((review) => review.doctorId === doctor.id)?.review}</div>
                                ) : (
                                    <div>-</div>
                                )}
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

export default ReviewForm;




