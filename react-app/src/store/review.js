const READ_REVIEWS = "reviews/READ_REVIEWS";
const CREATE_REVIEW = "reviews/CREATE_REVIEW";

const readReviews = (reviews) => ({
    type: READ_REVIEWS,
    payload: reviews,
});

const createReview = (review) => ({
    type: CREATE_REVIEW,
    payload: review,
});
  

export const getAllReviewsThunk = (gameId) => async (dispatch) => {
    const res = await fetch(`/api/reviews/games/${gameId}`);

    if (res.ok) {
    const reviews = await res.json();
    dispatch(readReviews(reviews.reviews));
    }
};


export const createReviewThunk = (review) => async (dispatch) => {
    const res = await fetch(`/api/reviews`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(review),
    });
  
    if (res.ok) {
      const newReview = await res.json();
      dispatch(createReview(newReview));
      return newReview;
    }
  };

const initialState = {};

const reviewsReducer = (state = initialState, action) => {
  let newState = { ...state };
  switch (action.type) {
    case CREATE_REVIEW:
      newState[action.payload.id] = action.payload;
      return newState;
    case READ_REVIEWS:
      const reviews = {};
      if (action.payload) {
        action.payload.forEach((review) => {
          reviews[review.id] = review;
        });
      }
      return reviews;
    default:
        return state
    }
};

export default reviewsReducer;