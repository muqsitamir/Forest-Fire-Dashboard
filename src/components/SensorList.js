import sensors from "../static/sensors"
import { AiOutlineCamera } from 'react-icons/ai';
import { CiTempHigh } from 'react-icons/ci';
import { WiHumidity } from 'react-icons/wi';
import ListGroup from 'react-bootstrap/ListGroup';
import {useState, useEffect} from 'react';

import './SensorList.css'
import {backend_url} from "../App";

function SensorList({sensorSelect}) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const Header = {};
    Header['Authorization'] = `Token ${localStorage.getItem("token")}`;
    let config = {
       headers: Header,
    };


    useEffect(() => {
        fetch(`${backend_url}/core/api/towers/`, config)
          .then((response) => {
            if (!response.ok) {
                throw new Error(
                  `This is an HTTP error: The status is ${response.status}`
                );
              }
              return response.json();
          })
          .then((actualData) => {
            setData(actualData.results);
            setError(null);
          })
          .catch((err) => {
            setError(err.message);
            setData(null);
          })
          .finally(() => {
            setLoading(false);
          });
      }, []);

    let n=["home","dashboard","orders"]
    
    return (
        <>
        <div style={{height:"40vh" }}>
     <main className="d-flex flex-nowrap">
  <div className="flex-shrink-0 p-2 w-100 bg-white">
    <a href="/" className="d-flex align-items-center pb-3 mb-3 link-dark text-decoration-none border-bottom">
      <span className="fs-6 fw-semibold">Forest Fire Dashboard</span>
    </a>
    <ul className="list-unstyled ps-0" style={{overflowY:"scroll", maxHeight:"75%" }}>
    {!loading && data.map((item, index) => {
                        let cam=item.cameras;
                        let sen=item.sensors;
                        let nn=n[index]+"-collapse";
                        let xx="#"+nn
                        return (
                            <li className="mb-1">
                                <button onClick={() => sensorSelect(item)} className="btn btn-toggle d-inline-flex align-items-center rounded border-0 collapsed" data-bs-toggle="collapse" data-bs-target={xx} aria-expanded="true">
                                Tower: {item.name}
                                </button>
                                <div className="collapse show" id={nn}>
                                <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small">
                                {
                                    cam.map((i2,ind2)=>{
                                        return(
                                    <li onClick={() => sensorSelect(i2)}>  
                                    <a  className="link-dark d-inline-flex text-decoration-none rounded">
                                    <AiOutlineCamera />&nbsp;&nbsp;{i2.description}
                                    </a>
                                    </li>
                        )})
                                }
                                {
                                    sen.map((i3,ind3)=>{
                                        return(
                                        <li onClick={() => sensorSelect(i3)}>
                                        <a  className="link-dark d-inline-flex text-decoration-none rounded">
                                        {i3.sensor_type=="Temperature"?<CiTempHigh />:<WiHumidity />}&nbsp;&nbsp;{i3.name}-&nbsp;{i3.sensor_type}</a></li>
                                    )})
                                }
                                </ul> 
        </div>
        </li>
                    )
                    })}
                    </ul>
      
        
  </div>
</main>
            
        </div>
        
      </>  
    );
}

export default SensorList;