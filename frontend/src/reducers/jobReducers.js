import {
  JOB_LIST_REQUEST,
  JOB_LIST_SUCCESS,
  JOB_LIST_FAIL,
  JOB_DETAILS_REQUEST,
  JOB_DETAILS_SUCCESS,
  JOB_DETAILS_FAIL,
} from '../constants/jobConstants.js';

export const jobListReducer = (state = { jobs: [] }, action) => {
  switch (action.type) {
    case JOB_LIST_REQUEST:
      return { loading: true, jobs: [] };
    case JOB_LIST_SUCCESS:
      return { loading: false, jobs: action.payload };
    case JOB_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const jobDetailsReducer = (state = { job: {} }, action) => {
  switch (action.type) {
    case JOB_DETAILS_REQUEST:
      return { loading: true, ...state };
    case JOB_DETAILS_SUCCESS:
      return { loading: false, job: action.payload };
    case JOB_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
