import { combineReducers } from 'redux';
import user from './user';
import stocksMarket from './stocksMarket';

const rootReducer = combineReducers({ user, stocksMarket });

export default rootReducer;