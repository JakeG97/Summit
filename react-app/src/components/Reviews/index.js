import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { getAllReviewsThunk, deleteReviewThunk, updateReviewThunk } from "../../store/review";
import './Reviews.css'

const Review = ({ review }) => {
    const dispatch = useDispatch();
    const sessionUser = useSelector((state) => state.session.user);
    const [showEditForm, setShowEditForm] = useState(false);
    const [recommended, setRecommended] = useState(review.recommended);
    const [description, setDescription] = useState(review.description);
  
    const handleDelete = () => {
      dispatch(deleteReviewThunk(review.id));
    };

    const handleEdit = (e) => {
        e.preventDefault();
        dispatch(updateReviewThunk(review.id, { recommended, description }));
        setShowEditForm(false);
      };
  
      return (
        <div className="review">
          <div className="review-container">
            <img
              className="profile-pic-review"
              src={sessionUser.profile_picture}
              alt="User profile picture"
            />
            {review.recommended ? (
              <p className="review-rating">
                <i className="fas fa-thumbs-up"></i> Yes
              </p>
            ) : (
              <p className="review-rating">
                <i className="fas fa-thumbs-down"></i> No
              </p>
            )}
            <p className="review-content">{new Date(review.created_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
            <p className="review-content">{review.description}</p>
            {review.reviewer_id === sessionUser && (
              <>
                <button onClick={handleDelete}>Delete</button>
                <button onClick={() => setShowEditForm(true)}>Edit</button>
              </>
            )}
          </div>
          {showEditForm && (
            <form onSubmit={handleEdit}>
              <div>
                <label>
                  Would you recommend this game?
                  <select
                    value={recommended}
                    onChange={(e) => setRecommended(e.target.value === "true")}
                  >
                    <option value={true}>Yes</option>
                    <option value={false}>No</option>
                  </select>
                </label>
              </div>
              <div>
                <label>
                  Write a review:
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Enter your review here"
                    rows={5}
                  />
                </label>
              </div>
              <button type="submit">Save Changes</button>
            </form>
          )}
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
      <h2>Reviews</h2>
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
