import React from 'react';
import { Link } from 'react-router-dom';

function Job({ item }) {
  const { _id, companyName, featured, title, type, location, skills } = item;

  let keywords = [...skills];

  return (
    <div
      className={
        featured ? 'job-container job-container--borderLeft' : 'job-container'
      }
    >
      <div className='part1'>
        <div className='company'>
          <span className='cname'>{companyName}</span>
          {/* check to see it its new and add styles */}
          {/* {newPost && <span className='new'>New!</span>} */}
          {featured && <span className='featured'>featured</span>}
        </div>

        <Link to={`/jobs/${_id}`}>
          <div className='position'>{title}</div>
        </Link>

        <div className='details'>
          <span>Edited</span>
          <span>&nbsp; • &nbsp;</span>
          <span>{type}</span>
          <span>&nbsp; • &nbsp;</span>
          <span>{location}</span>
        </div>
      </div>
      <div className='part2'>
        <p className='text-center'>Skills Required</p>
        <div className='keyword-container'>
          {keywords.map((key, id) => (
            <div key={id}>{key}</div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Job;
