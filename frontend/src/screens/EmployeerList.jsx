import React, { useEffect } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { useNavigate } from 'react-router-dom';
import { Button, Table, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { listJobs, deleteJobs, createJob } from '../actions/jobActions';
import { JOB_CREATE_RESET } from '../constants/jobConstants';

const AdminEditScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const jobList = useSelector((state) => state.jobList);
  const { loading, jobs, error } = jobList;

  const jobDelete = useSelector((state) => state.jobDelete);
  const { success: successJobDelete } = jobDelete;

  const jobCreate = useSelector((state) => state.jobCreate);
  const {
    loading: loadingJobCreate,
    error: errorJobCreate,
    job: createdJob,
    success: successJobCreate,
  } = jobCreate;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    dispatch({ type: JOB_CREATE_RESET });

    if (userInfo.isJobSeeker && userInfo.isAdmin) {
      navigate('/login');
    }
    // if (!userInfo.isJobSeeker) {
    //   dispatch(listJobs());
    // }

    if (successJobCreate) {
      navigate(`/employer/job/${createdJob._id}/edit`);
    } else {
      dispatch(listJobs());
    }
  }, [
    dispatch,
    navigate,
    userInfo,
    successJobDelete,
    successJobCreate,
    createdJob,
  ]);

  const deleteJobHandler = (id) => {
    if (window.confirm('Are you shure?')) {
      dispatch(deleteJobs(id));
    }
  };

  const createJobHandler = () => {
    dispatch(createJob());
    // navigate('/employer/createJob');
  };

  return (
    <>
      <Row className='align-items-center'>
        <Col>
          <h1>Jobs</h1>
        </Col>
        <Col className='d-flex justify-content-end'>
          <Button className='my-3' onClick={createJobHandler}>
            <i className='fas fa-plus'></i> Create Job
          </Button>
        </Col>
      </Row>
      {loadingJobCreate && <Loader />}
      {errorJobCreate && <Message variant='danger'>{errorJobCreate}</Message>}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
          <Table striped bordered hover responsive className='table-sm'>
            <thead className='text-center'>
              <tr>
                <th>ID</th>
                <th>POSTED BY</th>
                <th>TITLE</th>
                <th>POST DATE</th>
                <th>EDIT</th>
              </tr>
            </thead>
            <tbody className='text-center' style={{ justifyContent: 'center' }}>
              {jobs.map((job) => (
                <tr key={job._id}>
                  <td>{job._id}</td>
                  <td>{job.companyName}</td>
                  <td>{job.title}</td>
                  <td>{job.createdAt.split('T')[0]}</td>
                  <td>
                    <LinkContainer to={`/employer/job/${job._id}/edit`}>
                      <Button variant='light' className='btn-sm mr-1'>
                        <i className='fas fa-edit'></i>
                      </Button>
                    </LinkContainer>
                    <Button
                      variant='danger'
                      className='btn-sm'
                      onClick={() => deleteJobHandler(job._id)}
                    >
                      <i className='fas fa-trash'></i>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </>
      )}
    </>
  );
};

export default AdminEditScreen;
