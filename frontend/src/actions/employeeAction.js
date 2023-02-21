import { SAVE_EMPLOYEE_INFO1 } from '../constants/employeeConstant';

export const saveEmployeeInfo1 = (data) => (dispatch) => {
  dispatch({
    type: SAVE_EMPLOYEE_INFO1,
    payload: data,
  });

  localStorage.setItem('employeeInfo1', JSON.stringify(data));
};
