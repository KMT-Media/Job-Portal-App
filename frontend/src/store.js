// ! store.js entry point for redux(redux app lives here)
//* creat Store - function to create strore
//* Combine rededucers - to combine Reducer elements
// *applyMiddleware - enables us to use middlewares like thunk

import { createStore, combineReducers, applyMiddleware } from 'redux';
// thunk middleware to make async requests
import thunk from 'redux-thunk';
// to use react dev tools extention
import { composeWithDevTools } from 'redux-devtools-extension';

// import {
//   userLoginReducer,
//   userRegisterReducer,
//   userDetailsReducer,
//   userUpdateProfileReducer,
//   userListReducer,
//   userDeleteReducer,
//   userUpdateReducer,
// } from './reducers/userReducer';

const reducer = combineReducers({});

// const userInfoFromLocalStorate = localStorage.getItem('userInfo')
//   ? JSON.parse(localStorage.getItem('userInfo'))
//   : null;

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
