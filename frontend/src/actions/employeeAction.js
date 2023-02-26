import axios from "axios";
import { APPROVE_CV_PROFILE_FAIL, APPROVE_CV_PROFILE_REQUEST, APPROVE_CV_PROFILE_SUCCESS, CV_DELETE_FAIL, CV_DELETE_REQUEST, CV_DELETE_SUCCESS, CV_LIST_FAIL, CV_LIST_REQUEST, CV_LIST_SUCCESS, USER_CV_DETAILS_FAIL, USER_CV_DETAILS_REQUEST, USER_CV_DETAILS_SUCCESS, USER_CV_UPDATE_FAIL, USER_CV_UPDATE_REQUEST, USER_CV_UPDATE_SUCCESS } from "../constants/employeeConstant";


  export const listCvDetails = (id) => async (dispatch) => {
    try {
      dispatch({ type: USER_CV_DETAILS_REQUEST });
      const { data } = await axios.get(`/api/users/jobs/${id}`);
      dispatch({ type: USER_CV_DETAILS_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: USER_CV_DETAILS_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

  export const updateCv = (cv) => async (dispatch, getState) => {
    try {
      dispatch({
        type: USER_CV_UPDATE_REQUEST,
      });
  
      const {
        userLogin: { userInfo },
      } = getState();
  
      const config = {
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
  
      const { data } = await axios.put(`/api/users/jobs/${cv._id}`, cv, config);
      dispatch({
        type: USER_CV_UPDATE_SUCCESS,
        payload: data,
      });
      dispatch({
        type: USER_CV_DETAILS_SUCCESS,
        payload: data,
      })
      
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({
        type: USER_CV_UPDATE_FAIL,
        payload: message,
      });
    }
  };

  export const approveCv = (cv) => async (dispatch, getState) => {
    try {
      dispatch({
        type: APPROVE_CV_PROFILE_REQUEST,
      })
  
      const {
        userLogin: { userInfo },
      } = getState()
  
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
      }
  
      const { data } = await axios.put(`/api/users/jobs/${cv._id}`, cv, config);
  
      dispatch({
        type: APPROVE_CV_PROFILE_SUCCESS,
        payload: data,
      })
      dispatch({
        type: USER_CV_DETAILS_SUCCESS,
        payload: data,
      })
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      if (message === 'Not authorized, token failed') {
        dispatch(logout())
      }
      dispatch({
        type: APPROVE_CV_PROFILE_FAIL,
        payload: message,
      })
    }
  }

  export const listCvs = () => async (dispatch) => {
    try {
      dispatch({ type: CV_LIST_REQUEST });
      const { data } = await axios.get(`/api/users/jobs`);
      dispatch({ type: CV_LIST_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: CV_LIST_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

  export const deleteCvs = (id) => async (dispatch, getState) => {
    try {
      dispatch({
        type: CV_DELETE_REQUEST,
      });
  
      const {
        userLogin: { userInfo },
      } = getState();
  
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      await axios.delete(`/api/users/jobs/${id}`, config);
      dispatch({ type: CV_DELETE_SUCCESS });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({
        type: CV_DELETE_FAIL,
        payload: message,
      });
    }
  };

  
  