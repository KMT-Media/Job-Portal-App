import React, { useState, useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
import axios from 'axios';

function JobList() {
  const [jobs, setJobs] = useState([]);
  useEffect(() => {
    const fetchJobs = async () => {
      const { data } = await axios.get('/api/jobs');

      setJobs(data);
    };

    fetchJobs();
  }, []);

  return (
    <div className='header-container'>
      <Row>
        {jobs.map((job) => (
          <Col key={job._id} sm={12} md={6} lg={4}>
            {job.title}
          </Col>
        ))}
      </Row>
    </div>
  );
}

export default JobList;
