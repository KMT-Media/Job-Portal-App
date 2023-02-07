import {
  JOB_LIST_REQUEST,
  JOB_LIST_SUCCESS,
  JOB_LIST_FAIL,
  JOB_DETAILS_REQUEST,
  JOB_DETAILS_SUCCESS,
  JOB_DETAILS_FAIL,
  JOB_DELETE_REQUEST,
  JOB_DELETE_SUCCESS,
  JOB_DELETE_FAIL,
} from '../constants/jobConstants.js';

import axios from 'axios';

export const listJobs =
  (keyword = '') =>
  async (dispatch) => {
    try {
      dispatch({ type: JOB_LIST_REQUEST });
      const { data } = await axios.get(`/api/jobs?keyword=${keyword}`);
      dispatch({ type: JOB_LIST_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: JOB_LIST_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const listJobDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: JOB_DETAILS_REQUEST });
    const { data } = await axios.get(`/api/jobs/${id}`);
    dispatch({ type: JOB_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: JOB_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const deleteJobs = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: JOB_DELETE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    await axios.delete(`/api/jobs/${id}`, config);
    dispatch({ type: JOB_DELETE_SUCCESS });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: JOB_DELETE_FAIL,
      payload: message,
    });
  }
};
