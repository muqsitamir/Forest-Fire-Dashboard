import sensors from "../static/sensors"
import { AiOutlineCamera } from 'react-icons/ai';
import { CiTempHigh } from 'react-icons/ci';
import { WiHumidity } from 'react-icons/wi';
import ListGroup from 'react-bootstrap/ListGroup';
import {useState, useEffect} from 'react';

import './SensorList.css'

function EventList() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch(`https://forest-fire-dashboard.vercel.app/api/events`)
          .then((response) => {
            if (!response.ok) {
                throw new Error(
                  `This is an HTTP error: The status is ${response.status}`
                );
              }
              return response.json();
          })
          .then((actualData) => {
            console.log(actualData.data);
            setData(actualData.data);
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
        <div>
     <main className="d-flex flex-nowrap">
  <div className="flex-shrink-0 p-3 w-100 bg-white">
    <a href="/" className="d-flex align-items-center pb-3 mb-3 link-dark text-decoration-none border-bottom">
      <span className="fs-5 fw-semibold">Events</span>
    </a>
    <ListGroup style={{overflowY:"scroll", maxHeight:"75%" }}>
                {
                  data &&  data.map((item, index) => {
                        return (
                          <ListGroup.Item>
                          <a className="link-dark d-inline-flex text-decoration-none rounded" style={{fontSize:"14px"}}>{item.headline}- {item.severity}</a>

                          </ListGroup.Item>
                            )
                    })
                }
            </ListGroup>
      
        
  </div>
</main>
            
        </div>
        
      </>  
    );
}

export default EventList;