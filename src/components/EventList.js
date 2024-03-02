import {Table,TableBody,TableRow,TableCell} from '@mui/material';
import LatestEvents from './LatestEvents';
import {useState, useEffect} from 'react';
import './SensorList.css'

function EventList({eventClick}) {
    
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    const Header = {};
    Header['Authorization'] = `Token ${localStorage.getItem("token")}`;
    let config = {
        headers: Header,
    };

    useEffect(() => {

        fetch(`https://api.forestwatch.org.pk/core/api/event/`, config)
          .then((response) => {
            if (!response.ok) {
                throw new Error(
                  `This is an HTTP error: The status is ${response.status}`
                );
              }
              return response.json();
          })
          .then((actualData) => {
            console.log(actualData.results);
            setData(actualData.results);
            setError(null);
          })
          .catch((err) => {
            console.log(err);
            setError(err.message);
            setData(null);
          })
          .finally(() => {
            setLoading(false);
          });
      }, []);

      
    return (
        <>
        <div style={{height:'90vh',paddingRight:'0px'}}>
     <main className="d-flex flex-nowrap">
  <div className="flex-shrink-0 p-1 w-100 bg-white" style={{    display: 'flex',flexDirection: 'row',flexWrap: 'wrap', justifyContent: 'space-around'}} >
    <a href="/" className="d-flex align-items-center  mb-3 link-dark text-decoration-none border-bottom"  style={{background:'#2c3e50' ,paddingLeft:'11px',width:'100%',marginLeft: '16px',marginRight: '17px'}}>
      <span className="fs-6 fw-semibold" style={{color:'#f39c12'}}>Latest Events</span>
    </a>
    <div className='px-0 mx-0' style={{      overflowY: 'scroll',overflowX: 'hidden', height: '85vh',  width: 'max-content'}}> 
    <Table size="small" stickyHeader aria-label="sticky table"  style={{width:'100%',boxShadow: '0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12)'}}>
            
                <TableBody>
                {data && data.map((item,index) => (
                 <TableRow key={index} onClick={() => {
                    window.location.href=`/live/${item.camera}`
                   }}>
                 
                  <TableCell  id={index}><LatestEvents data={item} /></TableCell>
                     
                 </TableRow>
                     
                       
                ))}
                  </TableBody>
        </Table>
    </div>
      
        
  </div>
</main>
            
        </div>
        
      </>  
    );
}

export default EventList;