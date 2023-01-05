// ! store.js entry point for redux(redux app lives here)
//* create Store - function to create strore
//* Combine rededucers - to combine Reducer elements
// *applyMiddleware - enables us to use middlewares like thunk

import { createStore, combineReducers, applyMiddleware } from 'redux';
// thunk middleware to make async requests
import thunk from 'redux-thunk';
// to use react dev tools extention
import { composeWithDevTools } from 'redux-devtools-extension';

import { jobListReducer, jobDetailsReducer } from './reducers/JobReducers';

const reducer = combineReducers({
  jobList: jobListReducer,
  jobDetails: jobDetailsReducer,
});

// Load data when redux store loades(which are objects with initial data)
// fill the state with local storage data
const initialState = {};

// an array of thunk middleware
const middleware = [thunk];

// ! configureStore replaces createStore
const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
