import { createStore, combineReducers, applyMiddleware } from 'redux';
// thunk middleware to make async requests
import thunk from 'redux-thunk';
// to use react dev tools extention
import { composeWithDevTools } from 'redux-devtools-extension';

import {
  jobListReducer,
  jobDetailsReducer,
  jobDeleteReducer,
  jobCreateReducer,
  jobUpdateReducer,
  jobApplyUserReducer
} from './reducers/jobReducers';
import { cvDetailsReducer, cvListReducer, cvDeleteReducer, cvApproveReducer } from './reducers/employeeReducer';
import {
  userLoginReducer,
  userRegisterReducer,
  userDetailsReducer,
  userUpdateProfileReducer,
  userListReducer,
  userDeleteReducer,
  userUpdateCvReducer,
  userCvRegisterReducer
} from './reducers/userReducers';

const reducer = combineReducers({
  jobList: jobListReducer,
  jobDetails: jobDetailsReducer,
  jobDelete: jobDeleteReducer,
  jobCreate: jobCreateReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  userUpdate: userUpdateProfileReducer,
  userList: userListReducer,
  userDelete: userDeleteReducer,
  cvDetails: cvDetailsReducer,
  cvlist: cvListReducer,
  cvDelete: cvDeleteReducer,
  userUpdateCv: userUpdateCvReducer,
  userCvRegister: userCvRegisterReducer,
  jobUpdate: jobUpdateReducer,
  cvApprove: cvApproveReducer,
  jobApplyUser:jobApplyUserReducer
});

// Load data when redux store loades(which are objects with initial data)
// fill the state with local storage data
const userInfoFromLocalStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null;

// const saveEmployeeFromLocalStorate = localStorage.getItem('employeeInfo1')
//   ? JSON.parse(localStorage.getItem('employeeInfo1'))
//   : {};

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
