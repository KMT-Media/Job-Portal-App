import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import { login } from '../actions/userActions';
import '../scss/Login.scss';

const LoginScreen2 = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo, error } = userLogin;

  const location = useLocation();
  // no redirection if user is logged in
  const redirect = location.search ? location.search.split('=')[1] : '/';

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, userInfo, redirect]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };

  return (
    <div className='login-container'>
      <div className='box'>
        {error && <Message variant='danger'>{error}</Message>}
        <div className='login-header'>
          <p>Log In...</p>
        </div>
        <form onSubmit={submitHandler}>
          <div className='input-box'>
            <label htmlFor='email'>E-mail</label>
            <input
              type='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className='input-field'
            />
            <i className='fa-regular fa-envelope'></i>
          </div>
          <div className='input-box'>
            <label htmlFor='password'>Password</label>
            <input
              type='password'
              className='input-field'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <i className='fa-solid fa-lock'></i>
          </div>
          <div className='input-box'>
            <input type='submit' value='Sign In' className='input-submit' />
          </div>
        </form>

        <div className='forgot'>
          <Link to={redirect ? `/register?redirect=${redirect}` : '/register'}>
            <span className='forgot-span'>Register</span>
          </Link>

          <span>Forgot password?</span>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen2;
