import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { listUsers, deleteUser } from '../actions/userActions';
import { listJobs, deleteJobs } from '../actions/jobActions';
import { listCvs, deleteCvs } from '../actions/employeeAction';

const AdminEditScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const jobList = useSelector((state) => state.jobList);
  const { jobs } = jobList;

  const jobDelete = useSelector((state) => state.jobDelete);
  const { success: successJobDelete } = jobDelete;

  const userList = useSelector((state) => state.userList);
  const { loading, users, error } = userList;

  const cvlist = useSelector((state) => state.cvlist);
  const { cv, error:errorCv } = cvlist;

  const cvDelete = useSelector((state) => state.cvDelete);
  const { success: successCvDelete } = cvDelete;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userDelete = useSelector((state) => state.userDelete);
  const { success: successUserDelete } = userDelete;

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listUsers());
      dispatch(listJobs());
      dispatch(listCvs());
    } else {
      navigate('/login');
    }
  }, [dispatch, navigate, userInfo, successUserDelete, successJobDelete, successCvDelete]);

  const deleteUserHandler = (id) => {
    if (window.confirm('Are you shure?')) {
      dispatch(deleteUser(id));
    }
  };

  const deleteJobHandler = (id) => {
    if (window.confirm('Are you shure?')) {
      dispatch(deleteJobs(id));
    }
  };

  const deleteCvHandler = (id) => {
    if (window.confirm('Are you shure?')) {
      dispatch(deleteCvs(id));
    }
  }

  const gotoEdit = () => {
    navigate(`/admin/${id}/edit`)
  }

  return (
    <>
      
      {loading ? (
        <Loader />
      ) : error ? (
        <>
        <Message variant='danger'>{error}</Message>
        <Message variant='danger'>{errorCv}</Message>
        </>
      ) : (
        <>
        <h1>Manage Users</h1>
          <Table striped bordered hover responsive className='table-sm'>
            <thead className='text-center'>
              <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>EMAIL</th>
                <th>Job Seeker</th>
                <th>ADMIN</th>
                <th>EDIT</th>
              </tr>
            </thead>
            <tbody className='text-center' style={{ justifyContent: 'center' }}>
              {users.map((user) => (
                <tr key={user._id}>
                  <td>{user._id}</td>
                  <td>{user.name}</td>
                  <td>
                    <a href={`mailto:${user.email}`}>{user.email}</a>
                  </td>
                  <td>
                    {user.isJobSeeker ? (
                      <i
                        className='fas fa-check'
                        style={{ color: 'green' }}
                      ></i>
                    ) : (
                      <i className='fas fa-times' style={{ color: 'red' }}></i>
                    )}
                  </td>
                  <td>
                    {user.isAdmin ? (
                      <i
                        className='fas fa-check'
                        style={{ color: 'green' }}
                      ></i>
                    ) : (
                      <i className='fas fa-times' style={{ color: 'red' }}></i>
                    )}
                  </td>
                  <td>
                    <Button
                      variant='danger'
                      className='btn-sm'
                      onClick={() => deleteUserHandler(user._id)}
                    >
                      <i className='fas fa-trash'></i>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <h1>Manage Jobs</h1>
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
