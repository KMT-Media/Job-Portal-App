import { APPROVE_CV_PROFILE_FAIL, APPROVE_CV_PROFILE_REQUEST, APPROVE_CV_PROFILE_RESET, APPROVE_CV_PROFILE_SUCCESS, CV_DELETE_FAIL, CV_DELETE_REQUEST, CV_DELETE_SUCCESS, CV_LIST_FAIL, CV_LIST_REQUEST, CV_LIST_SUCCESS, USER_CV_DETAILS_FAIL, USER_CV_DETAILS_REQUEST, USER_CV_DETAILS_SUCCESS} from "../constants/employeeConstant";

export const cvDetailsReducer = (state = { cv: {} }, action) => {
  switch (action.type) {
    case USER_CV_DETAILS_REQUEST:
      return { loading: true, ...state };
    case USER_CV_DETAILS_SUCCESS:
      return { loading: false, cv: action.payload };
    case USER_CV_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const cvListReducer = (state = { cv: [] }, action) => {
  switch (action.type) {
    case CV_LIST_REQUEST:
      return { loading: true, cv: [] };
    case CV_LIST_SUCCESS:
      return { loading: false, cv: action.payload };
    case CV_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const cvDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case CV_DELETE_REQUEST:
      return { loading: true };
    case CV_DELETE_SUCCESS:
      return { loading: false, success: true };
    case CV_DELETE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const cvApproveReducer = (state = {}, action) => {
  switch (action.type) {
    case APPROVE_CV_PROFILE_REQUEST:
      return { loading: true };
    case APPROVE_CV_PROFILE_SUCCESS:
      return { loading: false, cv: action.payload, success: true };
    case APPROVE_CV_PROFILE_FAIL:
      return { loading: false, error: action.payload };
    case APPROVE_CV_PROFILE_RESET:
      return { cv: {}};
    default:
      return state;
  }
};