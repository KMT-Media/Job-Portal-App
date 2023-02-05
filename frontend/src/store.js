import { createStore, combineReducers, applyMiddleware } from 'redux';
// thunk middleware to make async requests
import thunk from 'redux-thunk';
// to use react dev tools extention
import { composeWithDevTools } from 'redux-devtools-extension';

import { jobListReducer, jobDetailsReducer } from './reducers/jobReducers';
import { userLoginReducer } from './reducers/userReducers';

const reducer = combineReducers({
  jobList: jobListReducer,
  jobDetails: jobDetailsReducer,
  userLogin: userLoginReducer,
});

// Load data when redux store loades(which are objects with initial data)
// fill the state with local storage data
const userInfoFromLocalStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null;
const initialState = {
  userLogin: { userInfo: userInfoFromLocalStorage },
};

// an array of thunk middleware
const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;