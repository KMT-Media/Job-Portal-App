import React from 'react';
import { FaSign, FaDashcube } from 'react-icons/fa';
import { Container, Nav, Navbar } from 'react-bootstrap';

function Header() {
  return (
    <header>
      <Navbar bg='dark' variant='dark' expand='lg' collapseOnSelect>
        <Container>
          <Navbar.Brand href='/'>JobPortal</Navbar.Brand>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='ml-auto'>
              <Nav.Link href='/portal'>
                <FaDashcube />
                Portal
              </Nav.Link>
              <Nav.Link href='/signin'>
                <FaSign />
                Sign In
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
}

export default Header;
