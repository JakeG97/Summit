import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createReviewThunk } from "../../store/review";
import "./ReviewForm.css";

const ReviewForm = ({ gameId }) => {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [recommended, setRecommended] = useState(true);
  const [description, setDescription] = useState("");
  const [activeButton, setActiveButton] = useState(null);
  const { id } = useSelector((state) => state.session.user);
  const game = useSelector((state) => state.games[gameId]);

  const handleRecommendationChange = (e) => {
    setRecommended(e.target.value === "true" ? true : false);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleRecommendationClick = (value) => {
    setRecommended(value);
    setActiveButton(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      createReviewThunk({ gameId, reviewer_id: id, recommended, description })
    );
    setRecommended(true);
    setDescription("");
    setActiveButton(null);
  };

  return (
    <div className="review-form">
      <h3 className="review-title-text">Write a review for {game.title}</h3>
      <p className="review-subtext">
        Please describe what you liked or disliked about this game and whether
        you recommend it to others.
      </p>
      <p className="review-subtext">
        Please remember to be polite and follow the Rules and Guidelines
      </p>
      <form onSubmit={handleSubmit}>
        <div>
          <img
            className="profile-pic-review"
            src={sessionUser.profile_picture}
            alt="User profile picture"
          />
          <textarea
            className="review-textarea"
            value={description}
            onChange={handleDescriptionChange}
            rows={5}
          />
          <p className="review-sub-subtext">Do you recommend this game?</p>
          <div className="thumb-buttons-container">
            <div className="thumb-buttons">
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
            </div>
            <button className="post-review-button" type="submit">
              Post review
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ReviewForm;