import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createReviewThunk } from "../../store/review";

const ReviewForm = ({ gameId }) => {
  const dispatch = useDispatch();
  const [recommended, setRecommended] = useState(true);
  const [description, setDescription] = useState("");
  const { id } = useSelector((state) => state.session.user);

  const handleRecommendationChange = (e) => {
    setRecommended(e.target.value === "true" ? true : false);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createReviewThunk({ gameId, reviewer_id: id, recommended, description }));
    setRecommended(true);
    setDescription("");
  };

  return (
    <div className="review-form">
      <h3>Add a review:</h3>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Would you recommend this game?
            <select value={recommended} onChange={handleRecommendationChange}>
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
              onChange={handleDescriptionChange}
              placeholder="Enter your review here"
              rows={5}
            />
          </label>
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default ReviewForm;
