import React, { useState, useEffect } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import "./live.css";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';

import CameraFeed from './CameraFeed';
import LiveEvents from './LiveEvents';
import { useSelector } from "react-redux";
import { selectSiteData } from "../reusable_components/site_data/siteDataSlice";
import SideNav from "../Headers/SideNav/SideNav";
import { useLocation, withRouter ,useParams} from "react-router-dom";
import { backend_url } from "../App";
import MiniMap from './MiniMap';

function LiveView() {
  const location = useLocation();
  const { id } = useParams();
  const [row, setRow] = useState(); 
  const full = useParams();
  const [view, setView] = useState("camera");
  const [camera, setCamera] = useState({ cam: "", link: "", id: 0 });
  const date = new Date().toLocaleDateString();
  const [tilt, setTilt] = useState(0);
  const [pan, setPan] = useState(0);
  const [zoom, setZoom] = useState(0);
  const [colour, setColor] = useState("white");
  const [eventItem, setEventItem] = useState({ exist: 0, item: "" });
  const [live, setLive] = useState(true);
  const [success, setSuccess] = useState(false);
  
  var timer = "";

  const [towers, setTowers] = useState(null);

  const { side_nav: side_nav_check } = useSelector(selectSiteData);
  let side_nav = side_nav_check ? <SideNav /> : null;

  const views = {
    camera: "camera component",
    map: "map component", //<MapContainer />
    video: <VideoComponent row={row} />,
  };

  const Header = {};
  Header['Authorization'] = `Token ${localStorage.getItem("token")}`;
  let config = {
    headers: Header,
  };

  useEffect(() => {
    var sid = id.split(" ");
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
        setTowers(actualData.results);
        var temp_id = Number(id);
        console.log(actualData.results);
        if (sid[0] === "event") setCamera({ cam: "Select a Camera", link: sid[2].replaceAll('(','/'), id: camera.id });
        else {
          const foundObject = actualData.results.find((obj) => obj.id === temp_id);
          setCamera({ cam: foundObject["name"], link: "", id: foundObject["id"] });
          // setCenter({center:{lat:actualData.results[temp_id]["lat"], lng:actualData.results[temp_id]["lat"]}, zoom: 12, isZoom:false})
        }
      })
      .catch((err) => {
        setTowers(null);
      });
  }, []);

  const eventClick = (item) => {
    // let x=item.camera==1?'Hawa Gali':item.camera==2?'Panja Gali':'Palm Gali';
    console.log("inside events", item);
    let x = item.camera_name;

    setCamera({ cam: x, link: item.file, id: item.id });
  };

  let HandleSubmit = async (e) => {
    e.preventDefault();
    try {
      // let nam = camera.cam.split(" ")[0]
      let nam = "PTZ-" + camera.cam.replace(" ", "-");
      console.log("nam is", nam);
      let res = await fetch(`${backend_url}/core/api/camera/ptzControls/`, {
        method: "POST",
        body: JSON.stringify({
          pan: pan,
          tilt: tilt,
          zoom: zoom,
          camera: nam,
        }),
        headers: {
          'Content-type': 'application/json;',
          'Authorization': `Token ${localStorage.getItem("token")}`,
        },
      });
      let resJson = await res.json();
      if (res.status === 200) {
        setSuccess(true);
        setZoom(0);
        setTilt(0);
        setPan(0);
      } else {
        console.log(resJson.error);
      }
    } catch (err) {
      console.log(err);
    }
  };


  return (
    <div className="page">
      <div className="page__content">
        <div className="main-wrapper">
          {side_nav}
          <div className='row navbar bg-dark'>
          
            <div className='col-md-4'>
              <div className='row mx-0 px-0'>
              
                <div className='col-md-4 lead text-light'>Tower Panel</div>
                <div className='col-md-8'>
                  <Dropdown>
                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                      {camera.cam}
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      {towers && towers.map((item, index) => (
                        <Dropdown.Item
                          key={item.id}
                          href={`/live/${item.id}`}
                          onClick={() => {
                            setCamera({ cam: item.name, link: "", id: item.id });
                          }}
                        >
                          {item.name}
                        </Dropdown.Item>
                      ))}
                    </Dropdown.Menu>
                  </Dropdown>
                </div>
              </div>
            </div>
            <div className='col-md-8'>
              <ul className="nav nav-tabs" defaultActiveKey="/home">
                <li className="nav-item">
                  <a
                    className={colour === "white" ? "nav-link active" : "nav-link"}
                    style={{ textDecoration: "none", color: colour === 'white' ? 'black' : 'white' }}
                    onClick={() => { setView("camera"); setColor("white") }}
                  >
                    Camera
                  </a>
                </li>
                <li>
                  <a
                    className={colour !== "white" ? "nav-link active" : "nav-link"}
                    style={{ color: colour }}
                    onClick={() => { setView("map"); setColor("black") }}
                    eventKey="link-1"
                  >
                    Map
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className='row' style={{ height: "50%" }}>
            <div className='col-md-4 d-flex justify-content-center'>
              <div className=' row mx-2 px-2 d-flex justify-content-center' style={{ backgroundColor: "white" }}>
                <form className='' onSubmit={HandleSubmit}>
                  <div className="row d-flex justify-content-center">
                    <p className='lead'>PTZ Controls</p>
                    <label className="form-label" htmlFor="customRange1">Pan <span className='lead' style={{ float: 'right' }}>{pan}</span></label>
                    <div className="row range w-50">
                      <input type="range" className="form-range" id="customRange1" value={pan} onChange={(e) => setPan(e.target.value)} min="0" max="360" step="1" />
                    </div>
                    <label className="form-label" htmlFor="customRange1">Zoom <span className='lead' style={{ float: 'right' }}>{zoom}</span></label>
                    <div className="row range w-50">
                      <input type="range" className="form-range" id="customRang32" value={zoom} onChange={(e) => setZoom(e.target.value)} min="0" max="100" step="1" />
                    </div>
                    <label className="form-label" htmlFor="customRange1">Tilt <span className='lead' style={{ float: 'right' }}>{tilt}</span></label>
                    <div className="row range w-50">
                      <input type="range" className="form-range" id="customRange3" value={tilt} onChange={(e) => setTilt(e.target.value)} min="0" max="90" step="1" />
                    </div>
                    <br></br>
                   
                    <div className="py-2">
                     <button className="btn btn-primary" type="submit">Confirm</button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
            <div className='col-md-8' style={{ backgroundColor: '#eeee',    paddingBottom: "20px"}}>
              <div className='mb-3 d-flex justify-content-center' style={{height:'50%',width:"100%"}}>
                {view === "camera" ? <CameraFeed cameraId={camera} view={view} live={live}  /> :
                  <MiniMap camId={id} />
                }
              </div>
            </div>
          </div>
          <div className='row'>
            <div className='col-md-4 px-4 py-2 d-flex justify-content-center' style={{ backgroundColor: '#fffff' }}>
              {view === "map" ? <CameraFeed cameraId={camera} view={view} live={live}  /> :
                <MiniMap camId={id}/>
              }
            </div>
            <div className='col-md-8 pe-0 me-0' style={{   paddingRight:"10px", backgroundColor: "rgba(238, 238, 238, 0.933)"}}>
              <LiveEvents eventClick={eventClick} cam_id={id} setRow={setRow} setView={setView} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const VideoComponent = ({ row }) => {
  return (
    <div>
      <img src={row.event} alt="" />
    </div>
  );
};

export default withRouter(LiveView);
