import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from 'react-bootstrap';

function Job({ job }) {
  return (
    <Card className='my-3 p-3 rounded'>
      <Card.Body>
        <Link to={`/jobs/${job._id}`}>
          <Card.Title as='div'>
            <strong>{job.title}</strong>
          </Card.Title>
        </Link>
        <Card.Text as='div'>{job.type}</Card.Text>
        <Card.Text as='h3'>{job.companyName}</Card.Text>
      </Card.Body>
    </Card>
  );
}

export default Job;
