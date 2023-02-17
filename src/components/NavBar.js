import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import pic from '../static/wwf.png'
import {Link} from 'react-router-dom';

function NavBar() {
  return (
    <div className='row my-0'>
      <Navbar className='col py-0 my-0'>
          <Navbar.Brand href="/map" className="m-1 px-4">
            <img
              alt=""
              src= "https://lums.edu.pk/sites/default/files/inline-images/LUMS%20Logo.png"
              width="120" 
            />{' '}
            </Navbar.Brand>
          <Nav className="nav-item mx-1">
            <Nav.Link as={Link} to="/map"><h6 className='p-0 m-0'>Home</h6></Nav.Link>
          </Nav>
          <Nav className="nav-item mx-1">
            <Nav.Link as={Link} to="/live/Camera%201" target="framename"><h6 className='p-0 m-0'>Dashboard</h6></Nav.Link>
          </Nav>
          <Nav className="nav-item mx-1">
            <Nav.Link href="https://www.wwfpak.org/"><h6 className='p-0 m-0'>About</h6></Nav.Link>
          </Nav>
      </Navbar>
      <Navbar className='col d-flex justify-content-end px-4 mx-4 py-0 my-0'>
      <Nav className="nav-item mx-2" style={{textDecoration: "underline"}}>
        <Nav.Link href="https://forest-fire-dashboard.vercel.app/admin" target="adminname"><h6 className='p-0 m-0'>Admin Panel</h6></Nav.Link>
      </Nav>
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