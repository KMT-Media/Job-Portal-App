import React, { useEffect, useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { approveCv, listCvDetails } from '../actions/employeeAction';
import { APPROVE_CV_PROFILE_RESET } from '../constants/employeeConstant';

import '../scss/jobDetail.scss';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { LinkContainer } from 'react-router-bootstrap';

const AdminApproveCv = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [name, setName] = useState('');
  const [gpa, setGpa] = useState(0);
  const [graduatedAt, setGraduatedAt] = useState('');
  const [workExperience, setWorkExperience] = useState('');
  const [languages, setLanguages] = useState('');

  const { id } = useParams();
  const { loading, cv, error } = useSelector((state) => state.cvDetails);

  const { success: successApprove} = useSelector((state) => state.cvApprove);

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const [isApproved, setIsApproved] = useState(cv.isApproved); 
  useEffect(() => {
    if(successApprove) {
      dispatch({type: APPROVE_CV_PROFILE_RESET});
      navigate('/admin/approvals')
    } else {
      dispatch(listCvDetails(id));
      setName(cv.name)
      setGpa(cv.gpa)
      setGraduatedAt(cv.graduatedAt)
      setWorkExperience(cv.workExperience)
      setLanguages(cv.languages)
    }
  }, [dispatch, id, userInfo, successApprove]);

  const submitHandler = (e) => {
    e.preventDefault()
    setIsApproved(!cv.isApproved);
    if (window.confirm('Are you shure?')) {
      dispatch(approveCv({
        _id: id,
        name,
        gpa,
        graduatedAt,
        workExperience,
        workExperience,
        languages,
        isApproved
    }))
    }
  };
  return ( 
    <>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
        <LinkContainer to='/admin/approvals'>
        <button className='btn btn-dark mt-3'>
          Go Back
        </button>
      </LinkContainer>
          <div className='detail-container'>
            <div className='left'>
              <p>
                <span>Id:</span>{' '}
                <span className='title'>{cv._id}</span>
              </p>
              <p>
                <span>Name: </span>
                {cv.name}
              </p>
              <p>
                <span>Gpa:</span> {cv.gpa}
              </p>
              <p>
                <span>Graduated At:</span> {cv.graduatedAt}
              </p>
              <p>
                <span>Work Experience:</span> {cv.workExperience}
              </p>
              <p>
                <span>Languages:</span> {cv.languages}
              </p>
              <p>
                <span>Cv Status:</span> {!cv.isApproved ? 'Not Approved' : 'Approved'}
              </p>
            </div>

            <div className='right'>
              <p></p>
              <p>
              </p>
              <form onSubmit={submitHandler}>
                {cv.isApproved ? <p className='text-info'>Cv Approved at: </p> : <p className='text-danger'>Cv Is Not Approved</p>}
                <input type='submit' value='Approve Cv' className='input-submit' />
              </form>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default AdminApproveCv;
