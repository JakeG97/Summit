import React from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../../context/Modal";
import { deleteReviewThunk } from "../../../store/review";
import "./DeleteReview.css"


const DeleteReviewModal = ({ reviewId, onClose }) => {
  const dispatch = useDispatch();
  const { closeModal } = useModal();

  const handleDeleteReview = () => {
    dispatch(deleteReviewThunk(reviewId));
    closeModal();
  };

  const handleCancel = () => {
    onClose();
  };

  return (
    <div className="delete-review-modal">
      <div className="delete-review-content">
        <p className="delete-review-title">Confirm Delete</p>
        <p className="delete-review-message">Are you sure you want to delete this review?</p>
        <div className="delete-review-buttons">
          <button id="review-yes" className="remove-yes" onClick={handleDeleteReview}>Yes</button>
          <button id="review-no" className="remove-no" onClick={handleCancel}>No</button>
        </div>
      </div>
    </div>
  );
};

export default DeleteReviewModal;
