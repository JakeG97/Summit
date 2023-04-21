const READ_REVIEWS = "reviews/READ_REVIEWS";

const readReviews = (reviews) => ({
    type: READ_REVIEWS,
    payload: reviews,
  });



  export const getAllReviewsThunk = (gameId) => async (dispatch) => {
    const response = await fetch(`/api/spots/${gameId}/reviews`);
  
    if (response.ok) {
      const reviews = await response.json();
      dispatch(readReviews(reviews.Reviews));
    }
  };



const initialState = {};

const reviewsReducer = (state = initialState, action) => {
  let newState = { ...state };
  switch (action.type) {
    case READ_REVIEWS:
      const reviews = {};
      action.payload.forEach((review) => {
        reviews[review.id] = review;
      });
      return reviews;
    default:
        return state
    }
};

export default reviewsReducer;