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

  return (
    <>
      <div className='profile-container'>
        <div className='box'>
          {message && <Message variant='danger'>{message}</Message>}
          {error && <Message variant='danger'>{error}</Message>}
          {success && <Message variant='success'>Profile Updated</Message>}
          {loading && <Loader />}

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
    </>
  );
};

export default ProfileScreen;
