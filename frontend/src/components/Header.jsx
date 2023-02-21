import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import { logout } from '../actions/userActions';

const Header = () => {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const dispatch = useDispatch();
  const loginSubmitHandler = () => {
    dispatch(logout());
  };

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
              {userInfo ? (
                <NavDropdown title={userInfo.name} id='username'>
                  <LinkContainer to='/profile'>
                    <NavDropdown.Item>Profile</NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Item onClick={loginSubmitHandler}>
                    Log Out
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                </NavDropdown>
              ) : (
                <LinkContainer to='/login'>
                  <Nav.Link>
                    <i className='fa-solid fa-user'></i> Sign In
                  </Nav.Link>
                </LinkContainer>
              )}

              {userInfo && userInfo.isAdmin && (
                <NavDropdown title='Manage' id='adminmenu'>
                  <LinkContainer to='/admin/editList'>
                    <NavDropdown.Item>
                      <i className='fa-solid fa-users'></i> Users & Jobs
                    </NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to='/admin/joblist'>
                    <NavDropdown.Item>
                      <i className='fa-solid fa-check'></i> Approvals
                    </NavDropdown.Item>
                  </LinkContainer>
                </NavDropdown>
              )}
              {userInfo && !userInfo.isJobSeeker && !userInfo.isAdmin && (
                <NavDropdown title='Manage' id='employermenu'>
                  <LinkContainer to='/employer/jobList'>
                    <NavDropdown.Item>
                      <i className='fa-solid fa-users'></i> Your Jobs
                    </NavDropdown.Item>
                  </LinkContainer>
                </NavDropdown>
              )}
              {userInfo && userInfo.isJobSeeker && (
                <NavDropdown title='Manage' id='employermenu'>
                  <LinkContainer to='/employeeForm'>
                    <NavDropdown.Item>
                      <i className='fa-solid fa-users'></i> Your CV
                    </NavDropdown.Item>
                  </LinkContainer>
                </NavDropdown>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
