import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { getAllReviewsThunk, deleteReviewThunk, updateReviewThunk, updateUser, getUserByIdThunk } from "../../store/review";
import ReviewForm from "../ReviewForm";
import './Reviews.css'
import { useParams } from "react-router-dom";

const Review = ({ review }) => {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [showEditForm, setShowEditForm] = useState(false);
  const [recommended, setRecommended] = useState(review.recommended);
  const [description, setDescription] = useState(review.description);
  const [activeButton, setActiveButton] = useState(null);
  const [reviewer, setReviewer] = useState(null);
  const { gameId } = useParams();

  const handleDelete = () => {
    dispatch(deleteReviewThunk(review.id));
  };

  const handleEdit = (e) => {
    e.preventDefault();
    dispatch(updateReviewThunk(review.id, { recommended, description }));
    setShowEditForm(false);
  };

  const handleRecommendationClick = (value) => {
    setRecommended(value);
    setActiveButton(value);
  };

  useEffect(() => {
    async function fetchReviewer() {
      const res = await fetch(`/api/users/${review.reviewer_id}`);
      const data = await res.json();
      setReviewer(data);
    }
    fetchReviewer();
  }, [review]);


  return (
    <div className="review">
      <div className="review-container">
        <div className="profile-container">
          <img
            className="profile-pic-review-list"
            src={reviewer?.profile_picture || "https://avatars.cloudflare.steamstatic.com/8ac27aecdce197c83213d6fb7257f7b55eb18a6c_full.jpg"}
            alt="User profile picture"
          />
          <p>{reviewer?.username}</p>
        </div>
        <div className="review-details">
          <div className="review-info">
            {review.recommended ? (
              <p className="review-rating">
                <i id="thumb-up" className="fas fa-thumbs-up fa-flip-horizontal"></i> Recommended
              </p>
            ) : (
              <p className="review-rating">
                <i id="thumb-down" className="fas fa-thumbs-down fa-flip-horizontal"></i> Not Recommended
              </p>
            )}
            <p className="review-content">Posted: {new Date(review.created_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
            <p className="review-description">{review.description}</p>
            {review?.reviewer_id === sessionUser?.id && (
              <>
                <button className="review-buttons" onClick={handleDelete}>Delete</button>
                <button className="review-buttons" onClick={() => setShowEditForm(true)}>
                  <i className="fas fa-pen-square"></i> Edit Review
                </button>
              </>
            )}
          </div>
          {showEditForm && (
            <form onSubmit={handleEdit}>
              <div className="edit-form-container">
                  <p>Update your review: </p>
                  <textarea
                    className="review-edit-textarea"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={5}
                    maxLength={1000}
                  />
              </div>
              <div className="edit-thumb-buttons">
              <button
                id="yes-button"
                type="button"
                className={
                  recommended
                  ? "active thumb-button"
                  : "hover thumb-button"
                }
                onClick={() => handleRecommendationClick(true)}
              >
                <i className="fas fa-thumbs-up fa-flip-horizontal"></i>
                {" "}
                Yes
              </button>
              <button
                id="no-button"
                type="button"
                className={
                  !recommended
                  ? "active thumb-button"
                  : "hover thumb-button"
                }
                onClick={() => handleRecommendationClick(false)}
              >
                <i className="fas fa-thumbs-down fa-flip-horizontal"></i>
                {" "}
                No
              </button>
              <button className="edit-review-button" type="submit">Update Review</button>
            </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );  
};  

const Reviews = ({ gameId }) => {
  const dispatch = useDispatch();
  const reviews = useSelector((state) => Object.values(state.reviews));

  useEffect(() => {
    dispatch(getAllReviewsThunk(gameId));
  }, [dispatch, gameId]);

  return (
    <div className="reviews">
      <h2 className="review-list-title">MOST HELPFUL REVIEWS</h2>
      {reviews.length > 0 ? (
        reviews.map((review) => {
          if (review.game_id === Number(gameId)) {
            return <Review key={review.id} review={review} />;
          } else {
            return null;
          }
        })
      ) : (
        <p>No reviews yet.</p>
      )}
    </div>
  );
};

export default Reviews;
