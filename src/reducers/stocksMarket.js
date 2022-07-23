import {
    FAILED_REQUEST,
    RECEIVE_STOCKS,
    REQUEST_STOCKS,
  } from '../actions';
  
  const INITIAL_STATE = {
    stocks: [],
    error: '',
  };
  
  function stocksMarket(state = INITIAL_STATE, action) {
    switch (action.type) {
      case REQUEST_STOCKS:
        return {...state};
      case RECEIVE_STOCKS:
        return {...state, stocks: action.payload};
      case FAILED_REQUEST:
        return {...state, error: action.payload};
      default:
        return state;
    }
  }
  
  export default stocksMarket;