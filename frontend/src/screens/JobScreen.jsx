import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { listJobDetails } from '../actions/jobActions';
import '../scss/jobDetail.scss';
import Loader from '../components/Loader';
import Message from '../components/Message';

const JobScreen = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { loading, job, error } = useSelector((state) => state.jobDetails);

  const submitHandler = () => {
    console.log('success');
  };

  useEffect(() => {
    dispatch(listJobDetails(id));
  }, [dispatch, id]);
  return (
    <>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <div className='detail-container'>
          <div className='left'>
            <p>
              <span>Job Title:</span> <span className='title'>{job.title}</span>
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
              <span>Skills Required</span>
              {job.skills}
            </p>
            <p>
              <span>Posted At: </span>
              {job.createdAt.split('T')[0]}
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
      )}
    </>
  );
};

export default JobScreen;
