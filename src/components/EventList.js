import sensors from "../static/sensors"
import { AiOutlineCamera } from 'react-icons/ai';
import { CiTempHigh } from 'react-icons/ci';
import { WiHumidity } from 'react-icons/wi';
import ListGroup from 'react-bootstrap/ListGroup';
import {useState, useEffect} from 'react';
import './SensorList.css'

function EventList({eventClick}) {
    const [row, setRow] = useState();
    const [view, setView] = useState("camera");
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

      function LinkFormatter(value, row, index) {
        // return "<a href='"+row.url+"'>"+value+"</a>";
        return "<a href='https://google.com'</a>";
      }
    
    return (
        <>
        <div style={{paddingRight:'0px'}}>
     <main className="d-flex flex-nowrap">
  <div className="flex-shrink-0 p-1 w-100 bg-white">
    <a href="/" className="d-flex align-items-center  mb-3 link-dark text-decoration-none border-bottom"  style={{background:'#2c3e50' ,paddingLeft:'5px'}}>
      <span className="fs-6 fw-semibold" style={{color:'#f39c12'}}>Events</span>
    </a>
    <div className='px-0 mx-0'> 
        <table className='table table-hover px-0 mx-0' style={{overflowY: "scroll",height:'20em',display: "block", fontSize:"12px"}}>
                <thead style={{position: "sticky",top:"0"}} >
                <tr>
                    <th scope="col">Event</th>
                    <th scope="col">Camera</th>
                    <th scope="col">Date</th>
                </tr>
                </thead>
                <tbody>
                {data && data.map((item,index) => (
                      <tr key={index}
                        onClick={() => {
                            
                            eventClick(item)
    
                            setRow(item);
                            setView("video");
                        }}
                        >
                        <td
                            style={{
                              textAlign: "center",
                            verticalAlign: "middle",
                            }}
                        >
                       <a href={`/live/${item.camera}`} target="framename" style={{ textDecoration: "none", color: "white" }}>
                         <img src={item.file} style={{ width: "100%" }} />
                       </a>
                        </td>
                      <td
                          style={{
                          textAlign: "center",
                          verticalAlign: "middle",
                          }}
                      >
                          {item.camera_name}
                      </td>
                      <td
                          style={{
                          textAlign: "center",
                          verticalAlign: "middle",
                          }}
                      >
                          {/* {(new Date(item.date)).getDate()}/{(new Date(item.date)).getMonth()+1}/{(new Date(item.date)).getFullYear()} */}
                          {item.date}
                      </td>
                      </tr>
                ))}
                </tbody>
        </table>
    </div>
      
        
  </div>
</main>
            
        </div>
        
      </>  
    );
}

export default EventList;