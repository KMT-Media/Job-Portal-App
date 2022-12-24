import React from 'react';
import { Form, Row, Col } from 'react-bootstrap';

function SearchBar() {
  return (
    <Row>
      <Col>
        <Form.Select>
          <option value='Full time'>Full time</option>
          <option value='Part time'>Part time</option>
          <option value='Contract'>Contract</option>
        </Form.Select>
      </Col>
      <Col>
        <Form.Select>
          <option value='Remote'>Remote</option>
          <option value='in-office'>in-office</option>
        </Form.Select>
      </Col>
      <Col>
        <button>Search</button>
      </Col>
    </Row>
  );
}

export default SearchBar;
