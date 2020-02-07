const userCheckboxesReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_USER_CHECKBOXES':
      return [...action.payload];
    case 'UNSET_USER':
      return [];
    default:
      return state;
  }
};

export default userCheckboxesReducer;