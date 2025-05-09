import sensors from "../static/sensors"
import { AiOutlineCamera } from 'react-icons/ai';
import { CiTempHigh } from 'react-icons/ci';
import { WiHumidity } from 'react-icons/wi';
import ListGroup from 'react-bootstrap/ListGroup';
import { Tooltip } from "@mui/material";
import {useState, useEffect} from 'react';
import './SensorList.css'
import {backend_url} from "../App";

function SensorList({sensorSelect}) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
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
      let HandleSubmit = async (e) => {
        //  e.preventDefault();
          try {
            // let nam = camera.cam.split(" ")[0]
            
            console.log("nam is", e.description);
            let res = await fetch(`${backend_url}/core/api/camera/ptzControls/`, {
              method: "POST",
              body: JSON.stringify({
                pan: '0',
                tilt: '0',
                zoom: '0',
                POWER: '1',
                camera: e.description,
              }),
              headers: {
                'Content-type': 'application/json;',
                'Authorization': `Token ${localStorage.getItem("token")}`,
              },
            });
            let resJson = await res.json();
            if (res.status === 200) {
              setSuccess(true);
             
            } else {
              console.log(resJson.error);
            }
            window.location.href=`/live/${e.id}`
          } catch (err) {
            console.log(err);
          }

        };
    let n=["1","2","3","4","5"]
    
    return (
        <>
        <div style={{ paddingRight:'0px' }}>
     <main className="d-flex flex-nowrap">
  <div className="flex-shrink-0 w-100 bg-white" >
    <a href="/" className="d-flex align-items-center  mb-3 link-dark text-decoration-none border-bottom" style={{background:'#2c3e50' ,paddingLeft:'5px'}}>
      <span className="fs-6 fw-semibold" style={{color:'#f39c12'}}>Cameras & Sensors</span>
    </a>
    <ul className="list-unstyled ps-0" style={{ maxHeight:"100%" }}>
    {!loading && data.map((item, index) => {
                        let cam=item.cameras;
                        let sen=item.sensors;
                        let nn=n[index]+"-collapse";
                        console.log("nn:"+index)
                        let xx="#"+nn
                        return (
                            <li key={index} className="mb-1">
                                <button onClick={() => sensorSelect(item)}
                                 className="btn btn-toggle d-inline-flex align-items-center rounded border-0 collapsed"
                                  data-bs-toggle="collapse"
                                   data-bs-target={xx} aria-expanded="true">
                                {item.name}
                                </button>
                                <div className="collapse" id={nn}>
                                <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small">
                                {
                                    cam.map((i2,ind2)=>{
                                        return(
                                          i2.live&&( <li key={ind2} onClick={() => sensorSelect(i2)}>  
                                          <a  className="link-dark d-inline-flex text-decoration-none rounded" href= "#">
                                          <AiOutlineCamera />&nbsp;&nbsp;{i2.description}
                                          </a> <Tooltip title="Live View" placement="top">
                                            <button style={{border:'none',borderRadius:'10px'}} onClick={()=>{HandleSubmit(i2)}}>
                                            <img src={require("../images/live.gif")} style={{width:'15px',height: '15px', marginBottom: '3px'}} /> </button>              
                                         </Tooltip> </li>)
                                   
                                   
                        )})
                                }
                                {
                                    sen.map((i3,ind3)=>{
                                        return(
                                        <li key={ind3} onClick={() => sensorSelect(i3)}>
                                        <a  className="link-dark d-inline-flex text-decoration-none rounded">
                                        {i3.sensor_type=="Temperature"?<CiTempHigh />:<WiHumidity />}&nbsp;&nbsp;{i3.name}</a></li>
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