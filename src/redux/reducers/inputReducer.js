const inputReducer = (state = {}, action) => {
  switch (action.type) {
    case 'ADD_INPUT_VALUE':
      return {...state, [action.payload.key]: action.payload.value};
    case 'CLEAR_INPUTS':
      return {};
    default:
      return state;
  }
};

export default inputReducer;
