// Store data from server to splitReducer
const splitReducer = (state = [], action) => action.type === `SET_SPLIT` ? action.payload : state;
  
export default splitReducer;