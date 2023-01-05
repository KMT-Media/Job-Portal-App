import React from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Container, Nav, Navbar } from 'react-bootstrap';

function Header() {
  return (
    <header>
      <Navbar bg='dark' variant='dark' expand='lg' collapseOnSelect>
        <Container>
          <LinkContainer to='/'>
            <Navbar.Brand>JobPortal</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='ms-auto'>
              <LinkContainer to='/portal'>
                <Nav.Link>
                  <i className='fa-solid fa-gauge'></i>
                  Portal
                </Nav.Link>
              </LinkContainer>
              <LinkContainer to='/signin'>
                <Nav.Link>
                  <i className='fa-solid fa-user'></i>
                  Signin
                </Nav.Link>
              </LinkContainer>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
}

export default Header;
