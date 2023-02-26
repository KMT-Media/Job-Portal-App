import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { LinkContainer } from 'react-router-bootstrap';

import { listCvs} from '../actions/employeeAction';
import '../scss/profile.scss';

const EmployeeProfile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  
  const cvlist = useSelector((state) => state.cvlist);
  const { cv, error:errorCv, loading } = cvlist;

  const cvDetail = cv.filter(c => c.user === userInfo._id)

  useEffect(() => {
    dispatch(listCvs())
    if (!userInfo) {
      navigate('/login');
    } 
  }, [navigate, userInfo, dispatch,]);

  return (
    <>
      {errorCv && <Message variant='danger'>{errorCv}</Message>}
      {/* {success && <Message variant='success'>Profile Updated</Message>} */}
      {loading && <Loader />}
      {cvDetail.map(c => (
        <div className='detail-container'>
        <div className='left'>
          <p>
            <span>Your Name:</span>{' '}
            <span className='title'>{c.name}</span>
          </p>
          <p>
            <span>Your Gpa: </span>
            <span className='title'>{c.gpa}</span>
          </p>
          <p><span>Graduated At:</span> <span className='title'>{c.graduatedAt}</span></p>
          <p><span>Work Experience:</span> <span className='title'>{c.workExperience}</span></p>
          <p>
              <span>languages:</span> <span className='title'>{c.languages}</span>
            </p>
          <p><span>Approval Status:</span> <span className='title'>{c.isApproved ? 'Approved' : 'Not Approved'}</span></p>
        </div>

        <div className='right'>
        <LinkContainer to={`/employee/${c._id}/edit`}>
            <input type='submit' value='Edit' className='input-submit' />
        </LinkContainer>
        </div>
      </div>
      ))}
    </>
  );
};

export default EmployeeProfile;
