import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';

import { listCvs, deleteCvs } from '../actions/employeeAction';

const ApprovalScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cvlist = useSelector((state) => state.cvlist);
  const { loading, cv, error:errorCv } = cvlist;

  const cvDelete = useSelector((state) => state.cvDelete);
  const { success: successCvDelete } = cvDelete;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  useEffect(() => {
    if (userInfo) {
      dispatch(listCvs());
    } else {
      navigate('/login');
    }
  }, [dispatch, navigate, userInfo, successCvDelete]);

  const deleteCvHandler = (id) => {
    if (window.confirm('Are you shure?')) {
      dispatch(deleteCvs(id));
    }
  }

  const editHanlder = (id) => {
    navigate(`/admin/cv/${id}/edit`);
  }

  return (
    <>
      {loading ? (
        <Loader />
      ) : errorCv ? (
        <Message variant='danger'>{errorCv}</Message>
      ) : (
        <>
          <h1>Approve Cvs</h1>
          <Table striped bordered hover responsive className='table-sm'>
            <thead className='text-center'>
              <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>GPA</th>
                <th>GRADUATED AT</th>
                <th>WORK EXPERIENCE</th>
                <th>LANGUAGES</th>
                <th>EDIT</th>
              </tr>
            </thead>
            <tbody className='text-center' style={{ justifyContent: 'center' }}>
              {cv.map((c) => (
                <tr key={c._id}>
                  <td>{c._id}</td>
                  <td>{c.name}</td>
                  <td>{c.gpa}</td>
                  <td>{c.graduatedAt}</td>
                  <td>{c.workExperience}</td>
                  <td>{c.languages}</td>
                  <td>
                    <Button
                      variant='danger'
                      className='btn-sm'
                      onClick={() => deleteCvHandler(c._id)}
                    >
                      <i className='fas fa-trash'></i>
                    </Button>
                    <Button
                      variant='danger'
                      className='btn-sm mx-1'
                      onClick={() => editHanlder(c._id)}
                    >
                      <i className='fas fa-edit'></i>
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

export default ApprovalScreen;
