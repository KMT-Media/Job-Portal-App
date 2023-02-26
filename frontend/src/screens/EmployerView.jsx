import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { createAppliedJob, listJobDetails } from '../actions/jobActions';
import '../scss/jobDetail.scss';
import Loader from '../components/Loader';
import Message from '../components/Message';

const EmployerView = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { id } = useParams();

  const { loading, job, error } = useSelector((state) => state.jobDetails);

  useEffect(() => {
    dispatch(listJobDetails(id));
  }, [dispatch, id]);

  const submitHandler = (e) => {
    
  };
  return (
    <>
    {loading ? (
        <Loader />
      ) : error ? (
        <>
        <Message variant='danger'>{error}</Message>
        </>
      ) : (
        <>
          <div className='detail-container'>
            <div className='left'>
              <p>
                <span>Job Title:</span>{' '}
                <span className='title'>{job.title}</span>
              </p>
              <p>
                <span>Level: </span>
                {job.jobLevel}
              </p>
            </div>

            <div className='right'>
              <p>Vaccancies: {job.numberOfEmployee} </p>
              <p>
                Sex:{' '}
                {job.applicantsNeeded == null
                  ? 'Female & Male'
                  : job.applicantsNeeded}{' '}
              </p>
              <form onSubmit={submitHandler}>
                  <input type='submit' value='Apply' className='input-submit' />
              </form>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default EmployerView;
