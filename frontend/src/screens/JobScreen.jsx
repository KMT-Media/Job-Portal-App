import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { listJobDetails } from '../actions/jobActions';
import Loader from '../components/Loader';
import Message from '../components/Message';

const JobScreen = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { loading, job, error } = useSelector((state) => state.jobDetails);

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
        <div>
          <h1>{job.title}</h1>
        </div>
      )}
    </>
  );
};

export default JobScreen;
