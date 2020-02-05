const previousQuestionReducer = (state = [], action) => {
  switch (action.type) {
    case 'ADD_PREVIOUS_QUESTION':
      return [...state, action.payload];
    case 'NEXT_PREVIOUS_QUESTION':
      return action.payload;
    case 'CLEAR_PREVIOUS_QUESTION':
      return [];
    default:
      return state;
  }
};

export default previousQuestionReducer;