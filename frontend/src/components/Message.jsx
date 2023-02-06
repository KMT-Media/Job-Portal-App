import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
import { Alert } from 'react-bootstrap';

function Message({ variant, children }) {
  const [show, setShow] = useState(true);
  if (show) {
    return (
      <div>
        <Alert
          className='mt-3'
          onClose={() => setShow(false)}
          variant={variant}
          dismissible
        >
          {children}{' '}
          {/* <Link to='/'>
          <Alert.Link>Go Back</Alert.Link>
        </Link> */}
        </Alert>
      </div>
    );
  }
}

Message.defaultProps = {
  variant: 'info',
};

export default Message;
