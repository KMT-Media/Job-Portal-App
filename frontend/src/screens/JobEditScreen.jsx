import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { listJobDetails } from '../actions/jobActions';
import '../scss/EmployerEdit.scss';

const JobEditScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const params = useParams();
  const { jobId } = params;

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

  const jobDetails = useSelector((state) => state.jobDetails);
  const { job } = jobDetails;

  useEffect(() => {
    if (job._id !== jobId) {
      dispatch(listJobDetails(jobId));
    } else {
      setCompanyName(job.companyName);
      setFeatured(job.setFeatured);
      setTitle(job.title);
      setJobLevel(job.jobLevel);
      setType(job.type);
      setLocation(job.location);
      setWorkLocation(job.workLocation);
      setDescription(job.description);
      setNumberOfEmployee(job.numberOfEmployee);
      setJobCategory(job.jobCategory);
      setSkills(job.skills);
    }
  }, [dispatch, jobId, job]);

  const submitHandler = (e) => {
    e.preventDefault();
    // update product
  };

  const goback = () => {
    navigate('/employer/jobList');
  };

  return (
    <>
      <button className='btn btn-dark mt-3' onClick={goback}>
        Go back
      </button>
      <div className='job-eidt-container'>
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
              <label htmlfor='jobseeker'>Job Seeker</label>
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
  );
};

export default JobEditScreen;
