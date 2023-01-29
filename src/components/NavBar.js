import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import pic from '../static/wwf.png'
import {Link} from 'react-router-dom';

function NavBar() {
  return (
    <div className='row '>
      <Navbar className='col py-0 my-0'>
          <Navbar.Brand href="/home" className="m-1 px-4">
            <img
              alt=""
              src= {pic}
              width="45"
              height="60"
              className="d-inline-block align-top bg-light"
            />{' '}
          </Navbar.Brand>
          <Nav className="nav-item mx-1">
            <Nav.Link as={Link} to="/home"><h6 className='p-0 m-0'>Home</h6></Nav.Link>
          </Nav>
          <Nav className="nav-item mx-1">
            <Nav.Link as={Link} to="/map"><h6 className='p-0 m-0'>Dashboard</h6></Nav.Link>
          </Nav>
          <Nav className="nav-item mx-1">
            <Nav.Link href="https://www.wwfpak.org/"><h6 className='p-0 m-0'>About</h6></Nav.Link>
          </Nav>
      </Navbar>
      <Navbar className='col d-flex justify-content-end px-4 mx-4 py-0 my-0'>
      <Nav className="btn btn-dark px-2 py-0">
            { 5==5 ?
            <Nav.Link className="text-white" as={Link} to="/login">Logout</Nav.Link> : 
            <Nav.Link className="text-white" as={Link} to="/login">Logout</Nav.Link>
            }
      </Nav>
    </Navbar>
    </div>
  );
}

export default NavBar;