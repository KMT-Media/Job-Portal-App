import { SAVE_EMPLOYEE_INFO1 } from '../constants/employeeConstant';

export const saveEmployeeAddress = (
  state = { employeeAddress: {} },
  action
) => {
  switch (action.type) {
    case SAVE_EMPLOYEE_INFO1:
      return { ...state, employeeInfo1: action.payload };
    default:
      return state;
  }
};
