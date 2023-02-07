import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { listUsers, deleteUser } from '../actions/userActions';
import { listJobs, deleteJobs } from '../actions/jobActions';

const UserListScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const jobList = useSelector((state) => state.jobList);
  const { jobs } = jobList;

  const jobDelete = useSelector((state) => state.jobDelete);
  const { success: successJobDelete } = jobDelete;

  const userList = useSelector((state) => state.userList);
  const { loading, users, error } = userList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userDelete = useSelector((state) => state.userDelete);
  const { success: successUserDelete } = userDelete;

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listUsers());
      dispatch(listJobs());
    } else {
      navigate('/login');
    }
  }, [dispatch, navigate, userInfo, successUserDelete, successJobDelete]);

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

  return (
    <>
      <h1>Manage Users</h1>
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
                <th>NAME</th>
                <th>EMAIL</th>
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

export default UserListScreen;
