import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { Row, Col, ListGroup, Card, Button, Form } from 'react-bootstrap';

import { listJobDetails } from '../actions/jobActions';

function JobsScreen() {
  const dispatch = useDispatch();
  const params = useParams();
  const jobDetails = useSelector((state) => state.jobDetails);
  const { loading, error, job } = jobDetails;

  useEffect(() => {
    dispatch(listJobDetails(params.id));
  }, [dispatch, params.id]);
  return (
    <>
      <Row>
        <Col md={3}>
          <Card>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <h3>{job.title}</h3>
              </ListGroup.Item>
              <ListGroup.Item>Type {job.type}</ListGroup.Item>
              <ListGroup.Item>Price: ${job.location}</ListGroup.Item>
              <ListGroup.Item>Description: {job.description}</ListGroup.Item>
            </ListGroup>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <Row>
                  <Col>
                    <strong>{job.companyName}</strong>
                  </Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>{job.companyStatus}</ListGroup.Item>

              <ListGroup.Item>
                <Button className='btn-block' type='button'>
                  Get A job
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
}

export default JobsScreen;
