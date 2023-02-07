import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { register } from '../actions/userActions';
import '../scss/Login.scss';

const RegisterScreen2 = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isJobSeeker, setIsJobSeeker] = useState(false);
  const [confirmPassword, setConfirmPassowrd] = useState('');
  const [message, setMessage] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userRegister = useSelector((state) => state.userRegister);
  const { loading, error, userInfo } = userRegister;

  const location = useLocation();
  const redirect = location.search ? location.search.split('=')[1] : '/';

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, userInfo, redirect]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage('Passwords do not match...');
    } else {
      dispatch(register(name, email, password, isJobSeeker));
    }
  };
  return (
    <div className='login-container'>
      <div className='box'>
        {message && <Message variant='danger'>{message}</Message>}
        {error && <Message variant='danger'>{error}</Message>}
        {loading && <Loader />}
        <div className='login-header'>
          <p>Register & get a Job</p>
        </div>
        <form onSubmit={submitHandler}>
          <div className='input-box'>
            <label htmlFor='email'>Name</label>
            <input
              type='name'
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className='input-field'
            />
          </div>
          <div className='input-box'>
            <label htmlFor='email'>E-mail</label>
            <input
              type='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className='input-field'
            />
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
          </div>
          <div className='input-box'>
            <label htmlFor='password'>Confirm Password</label>
            <input
              type='password'
              className='input-field'
              value={confirmPassword}
              onChange={(e) => setConfirmPassowrd(e.target.value)}
              required
            />
          </div>
          <div>
            <input
              type='checkbox'
              checked={isJobSeeker}
              onChange={(e) => setIsJobSeeker(e.target.checked)}
              required
            />
            <label htmlfor='jobseeker'>Job Seeker</label>
          </div>
          <div className='input-box'>
            <input type='submit' value='Register' className='input-submit' />
          </div>
        </form>

        <div className='forgot'>
          <Link to={redirect ? `/login?redirect=${redirect}` : '/login'}>
            <span className='forgot-span'>Login</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RegisterScreen2;
