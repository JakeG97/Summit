import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getAllReviewsThunk } from "../../store/review";
import { deleteReviewThunk } from "../../store/review";

const Review = ({ review }) => {
    const dispatch = useDispatch();
    const currentUserId = useSelector((state) => state.session.user?.id);
  
    const handleDelete = () => {
      dispatch(deleteReviewThunk(review.id));
    };
  
    return (
      <div className="review">
        <p className="review-rating">{review.recommended}</p>
        <p className="review-content">{review.description}</p>
        <p className="review-content">{review.created_at}</p>
        {review.reviewer_id === currentUserId && (
          <button onClick={handleDelete}>Delete</button>
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
