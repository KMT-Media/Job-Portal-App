import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { createAppliedJob, listJobDetails } from '../actions/jobActions';
import '../scss/jobDetail.scss';
import Loader from '../components/Loader';
import Message from '../components/Message';

const JobScreen = () => {
  const [uid, setUid] = useState('');
  const [btnDisabled, setBtnDisabled] = useState('')
  const [message, setMessage] = useState('')
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { id } = useParams();
  const { loading, job, error } = useSelector((state) => state.jobDetails);

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const cvDetails = useSelector((state) => state.cvDetails);
  const { cv } = cvDetails;

  const jobApplyUser = useSelector((state) => state.jobApplyUser);
  const { appliedJob } = jobApplyUser;

  const submitHandler = (e) => {
    dispatch(createAppliedJob({id, userApplied: uid}))
    e.preventDefault();
    if (!userInfo) {
      navigate('/login')
    } else if (!userInfo.isJobSeeker) {
      setBtnDisabled(true);
      setMessage('Can not apply to job while logged in as a recruiter');
    } else if (cv.length === 0) {
      navigate('/employeeForm')
    }else {
      navigate('/employeeProfile')
    }
  };

  useEffect(() => {
    // setUid(userInfo._id)
    dispatch(listJobDetails(id));
  }, [dispatch, id, userInfo]);
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
              <p>
                <span>Type:</span> {job.type}
              </p>
              <p>
                <span>Job Location:</span> {job.location}
              </p>
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
                <p className='text-danger'>{message}</p>
                <input
                  type='text'
                  value={uid}
                  onChange={(e) => setUid(e.target.value)}
                  required
                  className='input-field'
                  style={{display: 'none'}}
                />
                  <input type='submit' value='Apply'disabled={btnDisabled} className='input-submit' />
              </form>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default JobScreen;
