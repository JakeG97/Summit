const READ_REVIEWS = "reviews/READ_REVIEWS";
const CREATE_REVIEW = "reviews/CREATE_REVIEW";
const DELETE_REVIEW = "reviews/DELETE_REVIEW";

const readReviews = (reviews) => ({
    type: READ_REVIEWS,
    payload: reviews,
});

const createReview = (review) => ({
    type: CREATE_REVIEW,
    payload: review,
});

const deleteReview = (reviewId) => ({
  type: DELETE_REVIEW,
  payload: reviewId,
});
  

export const getAllReviewsThunk = (gameId) => async (dispatch) => {
    const res = await fetch(`/api/reviews/games/${gameId}`);

    if (res.ok) {
    const reviews = await res.json();
    dispatch(readReviews(reviews.reviews));
    }
};


export const createReviewThunk = (game) => async (dispatch) => {
    const res = await fetch(`/api/reviews/games/${game.gameId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(game),
    });
  
    if (res.ok) {
      const review = await res.json();
      dispatch(createReview(review));
    }
  };

export const deleteReviewThunk = (reviewId) => async (dispatch) => {
    const res = await fetch(`/api/reviews/${reviewId}`, {
        method: "DELETE",
    });

    if (res.ok) {
    dispatch(deleteReview(reviewId));
    }
};
  

const initialState = {};

const reviewsReducer = (state = initialState, action) => {
  let newState = { ...state };
  switch (action.type) {
    case CREATE_REVIEW:
      return {
        ...state,
        [action.payload.id]: action.payload,
      };
    case READ_REVIEWS:
      const reviews = {};
      if (action.payload) {
        action.payload.forEach((review) => {
          reviews[review.id] = review;
        });
      }
      return reviews;
    case DELETE_REVIEW:
        delete newState[action.payload];
        return newState;
    default:
        return state
    }
};

export default reviewsReducer;