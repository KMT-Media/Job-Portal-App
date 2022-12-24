import React from 'react';

// Components
import Header from './HOME/Header';
import JobList from './HOME/JobList';
import SearchBar from './HOME/SearchBar';

function HomeScreen() {
  return (
    <>
      <Header />
      <SearchBar />
      <JobList />
    </>
  );
}

export default HomeScreen;
