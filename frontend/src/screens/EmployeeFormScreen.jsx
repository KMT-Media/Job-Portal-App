import React, { useEffect, useState } from 'react';
import { useNavigate} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { registerCvAction } from '../actions/userActions';
import { listCvDetails } from '../actions/employeeAction';
import Loader from '../components/Loader';
import Message from '../components/Message';

import '../scss/Login.scss';

const EmployeeFormScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [gpa, setGpa] = useState(0);
  const [graduatedAt, setGraduatedAt] = useState('');
  const [workExperience, setWorkExperience] = useState('');
  const [languages, setLanguages] = useState('');

  const userLogin = useSelector(state => state.userLogin);
  const {userInfo} = userLogin;
  const userCvRegister = useSelector(state => state.userCvRegister);
  const {loading, success, cv, error} = userCvRegister;

  useEffect(() => {
    // if (success) {
    //   navigate('/');
    // }
  }, [navigate, success, cv]);

  const submitHandler = (e) => {
    e.preventDefault();
    // setUid(userInfo._id);
    dispatch(registerCvAction(name, gpa, graduatedAt, workExperience, languages));
  };

  return (
    <>
    {loading && <Loader />}
    {error && <Message variant='danger'>{error}</Message>}
    <div className='login-container'>
      <div className='box'>
        <div className='login-header'>
          <p>Register Your Cv Here</p>
        </div>
        <form onSubmit={submitHandler}>
          <div className='input-box'>
            <label htmlFor='name'>Name</label>
            <input
              type='name'
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className='input-field'
            />
          </div>
          <div className='input-box'>
            <label htmlFor='gpa'>GPA</label>
            <input
              type='number'
              value={gpa}
              onChange={(e) => setGpa(e.target.value)}
              required
              className='input-field'
            />
          </div>
          <div className='input-box'>
            <label htmlFor='graduatedat'>graduatedAt</label>
            <input
              type='text'
              className='input-field'
              value={graduatedAt}
              onChange={(e) => setGraduatedAt(e.target.value)}
              required
            />
          </div>
          <div className='input-box'>
            <label htmlFor='text'>Work Experience</label>
            <input
              type='text'
              className='input-field'
              value={workExperience}
              onChange={(e) => setWorkExperience(e.target.value)}
              required
            />
          </div>
          <div className='input-box'>
            <label htmlFor='text'>Languages</label>
            <input
              type='text'
              className='input-field'
              value={languages}
              onChange={(e) => setLanguages(e.target.value)}
              required
            />
          </div>
         
          <div className='input-box'>
            <input type='submit' value='CreateCv' className='input-submit' />
          </div>
        </form>
      </div>
    </div>
    </>
  );
};

export default EmployeeFormScreen;
