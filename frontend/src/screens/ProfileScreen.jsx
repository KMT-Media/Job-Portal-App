import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { getUserDetails } from '../actions/userActions';
import { updateUserProfile } from '../actions/userActions';
import { USER_UPDATE_PROFILE_RESET } from '../constants/userConstants';
import '../scss/profile.scss';

const ProfileScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassowrd] = useState('');
  const [message, setMessage] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userUpdate = useSelector((state) => state.userUpdate);
  const { success } = userUpdate;

  useEffect(() => {
    if (!userInfo) {
      navigate('/login');
    } else {
      if (!user.name || success) {
        dispatch({ type: USER_UPDATE_PROFILE_RESET });
        dispatch(getUserDetails('profile'));
      } else {
        setName(user.name);
        setEmail(user.email);
      }
    }
  }, [navigate, userInfo, dispatch, user, success]);

  const profileEditSubmitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage('Passwords do not match...');
    } else {
      dispatch(updateUserProfile({ id: user.id, name, email, password }));
    }
  };

  const submitHandler = () => {
    navigate('/employeeForm');
  };

  return (
    <>
      {message && <Message variant='danger'>{message}</Message>}
      {error && <Message variant='danger'>{error}</Message>}
      {success && <Message variant='success'>Profile Updated</Message>}
      {loading && <Loader />}
      <div className='profile-container'>
        <div className='box'>
          <div className='profile-header'>
            <p>Edit Profile</p>
          </div>

          <form onSubmit={profileEditSubmitHandler}>
            <div className='form-container'>
              <div className='form-left'>
                <div className='input-box'>
                  <label htmlFor='email'>Name</label>
                  <input
                    type='name'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className='input-field'
                  />
                </div>
                <div className='input-box'>
                  <label htmlFor='email'>E-mail</label>
                  <input
                    type='email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className='input-field'
                  />
                </div>
              </div>
              <div className='form-right'>
                <div className='input-box'>
                  <label htmlFor='password'>Password</label>
                  <input
                    type='password'
                    className='input-field'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div className='input-box'>
                  <label htmlFor='password'>Confirm Password</label>
                  <input
                    type='password'
                    className='input-field'
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassowrd(e.target.value)}
                  />
                </div>
              </div>
            </div>
            <div>
              <input type='submit' value='Update' className='input-submit' />
            </div>
          </form>
        </div>
      </div>
      <div className='detail-container'>
        <div className='left'>
          <p>
            <span>Job Title:</span>{' '}
            {/* <span className='title'>{cv.title}</span> */}
          </p>
          <p>
            <span>Level: </span>
            {/* {job.jobLevel} */}
          </p>
          <p>{/* <span>Type:</span> {job.type} */}</p>
          <p>{/* <span>Job Location:</span> {job.location} */}</p>
          {/* <p>
              <span>Work Location:</span> {job.workLocation}
            </p> */}
          <p>{/* <span>Job Description:</span> {job.description} */}</p>
          <p>{/* <span>Company Name:</span> {job.companyName} */}</p>
          <p>
            <span>Skills Required: </span>
            {/* {job.skills} */}
          </p>
          <p>
            <span>Posted At: </span>
            {/* {job.createdAt} */}
          </p>
        </div>

        <div className='right'>
          {/* <p>Vaccancies: {job.numberOfEmployee} </p> */}
          <p>
            {/* Sex:{' '}
                {job.applicantsNeeded == null
                  ? 'Female & Male'
                  : job.applicantsNeeded}{' '} */}
          </p>
          <form onSubmit={submitHandler}>
            <input type='submit' value='Edit' className='input-submit' />
          </form>
        </div>
      </div>
    </>
  );
};

export default ProfileScreen;
