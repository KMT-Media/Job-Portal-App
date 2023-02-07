import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../scss/Search.scss';

const SearchBox = () => {
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
  return (
    <form onSubmit={submitHandler} className='search-bar'>
      <input
        type='text'
        placeholder='Search your Job...'
        name='q'
        value={keyword}
        onChange={(e) => setkeyword(e.target.value)}
      />
      <button type='submit'>
        <i class='fa-solid fa-magnifying-glass'></i>
      </button>
    </form>
  );
};

export default SearchBox;
