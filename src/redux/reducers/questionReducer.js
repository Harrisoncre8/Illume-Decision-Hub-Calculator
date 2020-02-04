// Store data from server to questionReducer
const questionReducer = (state = [], action) => action.type === `SET_QUESTION` ? action.payload : state;

export default questionReducer;