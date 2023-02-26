import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import { updateJob } from '../actions/jobActions'
import { jobUpdateReducer } from '../reducers/jobReducers'
import { JOB_UPDATE_RESET } from '../constants/jobConstants';
import '../scss/EmployerEdit.scss'; 

const JobEditScreen = () => {
  const navigate = useNavigate()
  const params = useParams()

  const [companyName, setCompanyName] = useState('');
  const [featured, setFeatured] = useState(false);
  const [title, setTitle] = useState('');
  const [jobLevel, setJobLevel] = useState('');
  const [type, setType] = useState('');
  const [location, setLocation] = useState('');
  const [workLocation, setWorkLocation] = useState('');
  const [description, setDescription] = useState('');
  const [numberOfEmployee, setNumberOfEmployee] = useState(0);
  const [jobCategory, setJobCategory] = useState('');
  const [skills, setSkills] = useState([]);

  const dispatch = useDispatch()

  const jobUpdate = useSelector((state) => state.jobUpdate)
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = jobUpdate

  useEffect(() => {
    if (successUpdate) {
      dispatch({type: JOB_UPDATE_RESET})
      navigate(-1)
    } 
  }, [dispatch, navigate,  successUpdate])


  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(
      updateJob({
        _id: params.id,
        companyName,
        featured,
        title,
        jobLevel,
        type,
        location,
        workLocation,
        description,
        numberOfEmployee,
        jobCategory,
        skills
      })
    )
  }
  
const goback = () => {
  navigate(-1)
}

  return (
    <>
    <button className='btn btn-dark my-3' onClick={goback}>Go back</button>
    <div className='job-eidt-container mb-3'>
      <div className='box'>
        <div className='login-header'>
          <p>Create A Job</p>
        </div>
        <form onSubmit={submitHandler}>
          <div className='input-box'>
            <label htmlFor='name'>Company Name</label>
            <input
              type='name'
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              required
              className='input-field'
            />
          </div>
          <div className='input-box'>
            <label htmlFor='jobseeker'>Job Seeker</label>
            <input
              type='checkbox'
              checked={featured}
              onChange={(e) => setFeatured(e.target.checked)}
              required
            />
          </div>
          <div className='input-box'>
            <label htmlFor='title'>Title</label>
            <input
              type='text'
              className='input-field'
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div className='input-box'>
            <label htmlFor='jobLevel'>Job Level</label>
            <input
              type='text'
              className='input-field'
              value={jobLevel}
              onChange={(e) => setJobLevel(e.target.value)}
              required
            />
          </div>
          <div className='input-box'>
            <label htmlFor='type'>Job Type</label>
            <input
              type='text'
              className='input-field'
              value={type}
              onChange={(e) => setType(e.target.value)}
              required
            />
          </div>
          <div className='input-box'>
            <label htmlFor='location'>Your Location</label>
            <input
              type='text'
              className='input-field'
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              required
            />
          </div>
          <div className='input-box'>
            <label htmlFor='location'>Work Location</label>
            <input
              type='text'
              className='input-field'
              value={workLocation}
              onChange={(e) => setWorkLocation(e.target.value)}
              required
            />
          </div>
          <div className='input-box'>
            <label htmlFor='description'>Work Desription</label>
            <input
              type='text'
              className='input-field'
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>
          <div className='input-box'>
            <label htmlFor='numberofemployee'>Number of Employee</label>
            <input
              type='number'
              className='input-field'
              value={numberOfEmployee}
              onChange={(e) => setNumberOfEmployee(e.target.value)}
              required
            />
          </div>
          <div className='input-box'>
            <label htmlFor='jobcategory'>Job Category</label>
            <input
              type='text'
              className='input-field'
              value={jobCategory}
              onChange={(e) => setJobCategory(e.target.value)}
              required
            />
          </div>
          <div className='input-box'>
            <label htmlFor='skills'>Skills</label>
            <input
              type='text'
              className='input-field'
              value={skills}
              onChange={(e) => setSkills(e.target.value)}
              required
            />
          </div>
          <div className='input-box'>
            <input
              type='submit'
              value='Create Job'
              className='input-submit'
            />
          </div>
        </form>
      </div>
    </div>
  </>
  )
}

export default JobEditScreen