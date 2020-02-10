const passwordStatusReducer = (state = {}, action) => {
  switch (action.type) {
    case 'MATCH_PASSWORD':
      return action.payload;
    default:
      return state;
  }
};

// user will be on the redux state at:
// state.user
export default passwordStatusReducer;