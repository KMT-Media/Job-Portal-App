import React from 'react';
import { LinkContainer } from 'react-router-bootstrap';

const NotFound = () => {
  const goback = () => {};
  return (
    <>
      <h1>Page not found...</h1>
      <LinkContainer to='/'>
        <button className='btn btn-dark' onClick={goback}>
          Go Back
        </button>
      </LinkContainer>
    </>
  );
};

export default NotFound;
