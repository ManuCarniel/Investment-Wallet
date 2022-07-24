import { 
  ADD_EMAIL,
  ADD_STOCK,
  DEPOSIT_CASH,
  DRAW_CASH
} from "../actions";

const INITIAL_STATE = {
  email: '',
  cash: 0.00,
  isDisabled: true,
  isLoaded: false,
  stocks: [],
};

function user(state = INITIAL_STATE, action) {
  const { cash } = state;
  switch (action.type) {
  case ADD_EMAIL:
    return {
      ...state,
      email: action.payload };
  case DEPOSIT_CASH:
    return {
      ...state,
      cash: cash + (action.payload) };
  case DRAW_CASH:
    return {
      ...state,
      cash: cash - (action.payload) };
  case ADD_STOCK:
    return {
      ...state,
      stocks: [...state.stocks, action.payload]};
  default:
    return state;
  }
}

export default user;