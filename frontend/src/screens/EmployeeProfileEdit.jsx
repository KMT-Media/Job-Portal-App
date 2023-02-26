import React, { useEffect, useState } from 'react';
import { useNavigate, useParams} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../components/Loader';
import Message from '../components/Message';
import '../scss/Login.scss';
import { listCvDetails, updateCv } from '../actions/employeeAction';
import { USER_CV_UPDATE_RESET } from '../constants/employeeConstant';

const EmployeeProfileEdit = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const params = useParams();
    const cvId = params.id;

  const [name, setName] = useState('');
  const [gpa, setGpa] = useState(0);
  const [graduatedAt, setGraduatedAt] = useState('');
  const [workExperience, setWorkExperience] = useState('');
  const [languages, setLanguages] = useState('');

  const { loading, cv, error } = useSelector((state) => state.cvDetails);
  const { loading: loadingUpdate, success: successUpdate, error: errorUpdate} = useSelector((state) => state.userUpdateCv);
  useEffect(() => {
    if (successUpdate){
        dispatch({type: USER_CV_UPDATE_RESET})
        navigate(-1);
    } else {
        if (!cv.name) {
            dispatch(listCvDetails(cvId));
        } else {
            setName(cv.name)
            setGpa(cv.gpa)
            setGraduatedAt(cv.graduatedAt)
            setWorkExperience(cv.workExperience)
            setLanguages(cv.languages)
        }
    }
  }, [dispatch, navigate, cvId, cv, successUpdate]);

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(updateCv({
        _id: cvId,
        name,
        gpa,
        graduatedAt,
        workExperience,
        workExperience,
        languages
    }))
  }

  return (
    <>
    {loading && <Loader />}
    {error && <Message variant='danger'>{error}</Message>}
    {error && <Message variant='danger'>{errorUpdate}</Message>}
    <div className='login-container'>
      <div className='box'>
        <div className='login-header'>
          <p>Update your cv here</p>
        </div>
        <form onSubmit={submitHandler}>
          <div className='input-box'>
            <label htmlFor='name'>Your Name:</label>
            <input
              type='name'
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className='input-field'
            />
          </div>
          <div className='input-box'>
            <label htmlFor='gpa'>GPA</label>
            <input
              type='number'
              value={gpa}
              onChange={(e) => setGpa(e.target.value)}
              required
              className='input-field'
            />
          </div>
          <div className='input-box'>
            <label htmlFor='graduatedat'>Graduated At</label>
            <input
              type='text'
              className='input-field'
              value={graduatedAt}
              onChange={(e) => setGraduatedAt(e.target.value)}
              required
            />
          </div>
          <div className='input-box'>
            <label htmlFor='text'>Work Experience</label>
            <input
              type='text'
              className='input-field'
              value={workExperience}
              onChange={(e) => setWorkExperience(e.target.value)}
              required
            />
          </div>
          <div className='input-box'>
            <label htmlFor='text'>Languages</label>
            <input
              type='text'
              className='input-field'
              value={languages}
              onChange={(e) => setLanguages(e.target.value)}
              required
            />
          </div>
         
          <div className='input-box'>
            <input type='submit' value='Update Cv' className='input-submit' />
          </div>
        </form>
      </div>
    </div>
    </>
  );
};

export default EmployeeProfileEdit;
