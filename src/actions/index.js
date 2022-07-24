export const ADD_EMAIL = 'ADD_EMAIL';
export const REQUEST_STOCKS = 'REQUEST_STOCKS';
export const RECEIVE_STOCKS = 'RECEIVE_STOCKS';
export const FAILED_REQUEST = 'FAILED_REQUEST';
export const UPDATE_CASH = 'UPDATE_CASH';
export const UPDATE_STATUS = 'UPDATE_STATUS';

export const addEmail = (payload) => ({ type: ADD_EMAIL, payload });
export const updateCash = (payload) => ({ type: UPDATE_CASH, payload });

export const setLoadingStatus = (payload) => ({type: UPDATE_STATUS, payload});

const requestStocks = () => ({
  type: REQUEST_STOCKS});

const receiveStocks = (payload) => ({
  type: RECEIVE_STOCKS,
  payload});

const failedRequest = (error) => ({type: FAILED_REQUEST, value: error});

export const fetchStocks = () => async (dispatch) => {
  dispatch(requestStocks());
  try {
    const response = await fetch('https://my-json-server.typicode.com/manucarniel/fakeapi/bolsas');
    const json = await response.json();
    const stocks = json.map((element) => element);
    return dispatch(receiveStocks(stocks));
  } catch (error) {
    return dispatch(failedRequest(error));
  }
};