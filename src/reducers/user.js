import { ADD_EMAIL, UPDATE_CASH, UPDATE_STATUS } from "../actions";

const INITIAL_STATE = {
  email: '',
  cash: 15.00,
  isDisabled: true,
  isLoaded: false,
};

function validateDrawButton(cash) {
  const ACCEPTABLE_VALUE = 5;
  const validValue = (cash >= ACCEPTABLE_VALUE)
  return validValue;
};

function user(state = INITIAL_STATE, action) {
  switch (action.type) {
  case ADD_EMAIL:
    return {
      ...state,
      email: action.payload };
  case UPDATE_CASH:
    return {
      ...state,
      cash: action.payload, 
      isDisabled: validateDrawButton(action.payload) };
  case UPDATE_STATUS:
    return {
      ...state,
      isLoaded: action.payload };
  default:
    return state;
  }
}

export default user;