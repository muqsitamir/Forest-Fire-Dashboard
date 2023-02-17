import { MDBFooter } from 'mdb-react-ui-kit';

export default function App() {
  return (
    <MDBFooter bgColor='dark' className='text-center text-white text-lg-left'>
      <div className='text-center p-2' style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)', fontSize: '12px'}}>
        &copy; {new Date().getFullYear()} Copyright:{' '}
        <a className='text-light' href='https://www.worldwildlife.org/'>
        WWF
        </a>
       <span> - </span>Technology for People Initiative, LUMS
      </div>
    </MDBFooter>
  );
}