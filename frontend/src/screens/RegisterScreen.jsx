import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Button, Form, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import FormContainer from '../components/FormContainer';
import { register } from '../actions/userActions';
import Loader from '../components/Loader';
import { AnimatePresence, motion } from 'framer-motion';
// import Meta from '../components/Meta';
// import { toast } from 'react-toastify';

const LoginScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
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
      dispatch(register(name, email, password));
    }
  };
  return (
    <>
      <FormContainer>
        <h1 className='text-center'>Register</h1>
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 1, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
          >
            {message && <Message variant='danger'>{message}</Message>}
          </motion.div>
        </AnimatePresence>
        {error && <Message variant='danger'>{error}</Message>}
        {loading && <Loader />}
        <Form onSubmit={submitHandler}>
          <Form.Group controlId='name'>
            <Form.Control
              type='name'
              placeholder='Enter Name'
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId='email' className='mt-3'>
            <Form.Control
              type='email'
              placeholder='Enter Email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId='password' className='mt-3'>
            <Form.Control
              type='password'
              placeholder='Enter password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId='confirmPassword' className='mt-3'>
            <Form.Control
              type='password'
              placeholder='Confirm password'
              value={confirmPassword}
              onChange={(e) => setConfirmPassowrd(e.target.value)}
              required
            ></Form.Control>
          </Form.Group>
          <Button type='submit' variant='primary' className='mt-3 btn-block'>
            Register
          </Button>
        </Form>

        <Row className='py-3'>
          <Col>
            Already have an account? Click{' '}
            <Link to={redirect ? `/login?redirect=${redirect}` : '/login'}>
              Here
            </Link>{' '}
            to Login
          </Col>
        </Row>
      </FormContainer>
    </>
  );
};

export default LoginScreen;
