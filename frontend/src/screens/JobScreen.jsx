import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { listJobDetails } from '../actions/jobActions';
import '../scss/jobDetail.scss';
import Loader from '../components/Loader';
import Message from '../components/Message';

const JobScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const { loading, job, error } = useSelector((state) => state.jobDetails);

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const submitHandler = () => {
    navigate('/employeeForm');
  };

  useEffect(() => {
    dispatch(listJobDetails(id));
  }, [dispatch, id, userInfo]);
  return (
    <>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
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
              <p>
                <span>Type:</span> {job.type}
              </p>
              <p>
                <span>Job Location:</span> {job.location}
              </p>
              {/* <p>
              <span>Work Location:</span> {job.workLocation}
            </p> */}
              <p>
                <span>Job Description:</span> {job.description}
              </p>
              <p>
                <span>Company Name:</span> {job.companyName}
              </p>
              <p>
                <span>Skills Required: </span>
                {job.skills}
              </p>
              <p>
                <span>Posted At: </span>
                {job.createdAt}
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
                {userInfo.isJobSeeker === true && (
                  <input type='submit' value='Apply' className='input-submit' />
                )}
              </form>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default JobScreen;
