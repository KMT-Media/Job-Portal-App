import React, { useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { listJobs } from '../../actions/jobActions';
import Job from './Job';
import Message from '../Message';
import Loader from '../Loader';

function JobList() {
  const dispatch = useDispatch();
  const jobList = useSelector((state) => state.jobList);
  const { loading, error, jobs } = jobList;

  useEffect(() => {
    dispatch(listJobs());
  }, [dispatch]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <div className='header-container'>
          <Row>
            {jobs.map((job) => (
              <Col key={job._id} sm={12} md={6} lg={4}>
                <Job job={job} />
              </Col>
            ))}
          </Row>
        </div>
      )}
    </>
  );
}

export default JobList;
