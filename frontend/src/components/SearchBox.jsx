import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { JOB_SEARCH_RESET } from '../constants/jobConstants';
import '../scss/Search.scss';

const SearchBox = () => {
  const dispatch = useDispatch();
  const { jobs } = useSelector((state) => state.jobList);

  const navigate = useNavigate();
  const [keyword, setkeyword] = useState('');

  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      navigate(`/search/${keyword}`);
    } else {
      navigate('/');
    }
  };

  const goback = () => {
    navigate('/');
  };

  const resetHandler = () => {
    dispatch({ type: JOB_SEARCH_RESET });
  };

  return (
    <>
      <form onSubmit={submitHandler} className='search-bar'>
        <input
          type='text'
          placeholder='Search your Job...'
          name='q'
          value={keyword}
          onChange={(e) => setkeyword(e.target.value)}
        />
        <button type='submit'>
          <i className='fa-solid fa-magnifying-glass'></i>
        </button>
        {jobs.length > 0 && (
          <button type='submit' className='mx-2' onClick={resetHandler}>
            Clear
          </button>
        )}
      </form>
      {jobs.length === 0 && (
        <button className='back' onClick={goback}>
          Go back
        </button>
      )}
    </>
  );
};

export default SearchBox;
