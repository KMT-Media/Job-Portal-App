import React from 'react';
import { Link } from 'react-router-dom';
import { Alert } from 'react-bootstrap';

function Message({ variant, children }) {
  return (
    <Alert className='mt-3' variant={variant}>
      {children}{' '}
      <Link to='/'>
        <Alert.Link>Go Back</Alert.Link>
      </Link>
    </Alert>
  );
}

Message.defaultProps = {
  variant: 'info',
};

export default Message;
