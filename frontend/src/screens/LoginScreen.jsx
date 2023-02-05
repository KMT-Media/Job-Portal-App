import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Button, Form, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import FormContainer from '../components/FormContainer';
import { login } from '../actions/userActions';
// import Meta from '../components/Meta';
// import { toast } from 'react-toastify';

const LoginScreen = () => {
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
    <>
      <FormContainer>
        <h1 className='text-center'>Sign in</h1>
        {error && <Message variant='danger'>{error}</Message>}
        <Form onSubmit={submitHandler}>
          <Form.Group controlId='email'>
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
          <Button type='submit' variant='primary' className='mt-3 btn-block'>
            Sign In{' '}
          </Button>
        </Form>

        <Row className='py-3'>
          <Col>
            New Customer? click{' '}
            <Link
              to={redirect ? `/register?redirect=${redirect}` : '/register'}
            >
              Here
            </Link>{' '}
            to Register
          </Col>
        </Row>
      </FormContainer>
    </>
  );
};

export default LoginScreen;
