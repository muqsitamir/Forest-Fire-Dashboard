import Nav from 'react-bootstrap/Nav';
import { useParams } from 'react-router';
import React, { useEffect, useState } from "react";
import Dropdown from 'react-bootstrap/Dropdown';
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';
import Table from 'react-bootstrap/esm/Table';
import Container from 'react-bootstrap/esm/Container';
import image from "../static/OIP.jpeg"
import { GoogleMap, LoadScript, Circle ,Marker, InfoWindow  } from "@react-google-maps/api"
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import "./live.css"
import CameraFeed from './CameraFeed';
import LiveEvents from './LiveEvents';
import {useSelector} from "react-redux";
import {selectSiteData} from "../reusable_components/site_data/siteDataSlice";
import SideNav from "../Headers/SideNav/SideNav";


export default function LiveView() {
  const { id } = useParams();
  const full = useParams()
  console.log(id);
  console.log(full);
  const [view, setView] = useState("camera");
  const [camera, setCamera] = useState({cam:"Hawa Gali",link:""});
  const date = new Date().toLocaleDateString();
  const [row, setRow] = useState();
  const [tilt, setTilt] = useState(0)
  const [pan, setPan] = useState(0)
  const [zoom, setZoom] = useState(0)
  const [colour, setColor] = useState("white")
  const [eventItem, setEventItem] = useState({exist:0, item:""})
  const [live, setLive] = useState(true)
  const [success, setSuccess] = useState(false)
  var timer = ""

  const { side_nav: side_nav_check } = useSelector(selectSiteData);
  let side_nav = side_nav_check ? <SideNav /> : null;

  const defaultCenter = {lat: 31.582045, lng: 74.329376}
  const [ center, setCenter ] = useState({center:defaultCenter, zoom: 12, isZoom:false});

  const views = {
    camera: "camera component",
    map: "map component", //<MapContainer />
    video: <VideoComponent row={row} />,
  };

  const mapStyles = {        
    height: "40vh",
    width: "100%"
  };

  useEffect(()=>{
    var sid = id.split(" ")
    console.log("sid", sid)
    if(id == "Camera 1") setCamera({cam:"Hawa Gali",link:""})
    else if(id == "Camera 2") setCamera({cam:"Panja Gali",link:""})
    else if(id == "Camera 3") setCamera({cam:"Palm Gali",link:""})
    else if(sid[0] == "event") setCamera({cam:"Event",link:sid[2].replaceAll('(','/')})
  }, [])

  const eventClick = (item) => {
    console.log(item)
    let x=item.camera==1?'Hawa Gali':item.camera==2?'Panja Gali':'Palm Gali';
    setCamera({cam:x,link:item.file})
  }
  
  let HandleSubmit = async (e) => {
    e.preventDefault();
    try {
      let res = await fetch("https://forest-fire-dashboard.vercel.app/api/ptzControls", {
        method: "POST",
        body: JSON.stringify({
          pan: pan,
          tilt: tilt,
          zoom: zoom,
        }),
        headers: {
            'Content-type': 'application/json;',
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
                    <Dropdown.Item href="#" onClick={() => { setCamera({cam:"Hawa Gali",link:""}); }}>
                        Hawa Gali
                    </Dropdown.Item>
                    <Dropdown.Item href="#" onClick={() => { setCamera({cam:"Panja Gali",link:""}); }}>
                        Panja Gali
                    </Dropdown.Item>
                    <Dropdown.Item href="#" onClick={() => { setCamera({cam:"Palm Gali",link:""}); }}>
                        Palm Gali
                    </Dropdown.Item>
                    <Dropdown.Item disabled href="#">
                        Event
                    </Dropdown.Item>
                </Dropdown.Menu>
                </Dropdown>
                </div>
                </div>
            </div>
            <div className='col-md-8'>
                <ul className="nav nav-tabs" defaultActiveKey="/home">
                <li className="nav-item">
                    <a className={colour=="white"?"nav-link active":"nav-link"} style={{textDecoration:"none",color:colour=='white'?'black':'white'}} onClick={() => {setView("camera"); setColor("white")}}>Camera</a>
                </li>
                <li>
                    <a className={colour!="white"?"nav-link active":"nav-link"} style={{color:colour}} onClick={() => {setView("map");setColor("black")}} eventKey="link-1">Map</a>
                </li>
                </ul>
            </div>
        </div>
        <div className='row' style={{height:"60%"}}>
            <div className='col-md-4 d-flex justify-content-center'>
                <div className=' row mx-2 px-2 d-flex justify-content-center' style={{backgroundColor:"white"}}>
                        <form className=''onSubmit={HandleSubmit}>
                        <div className="row d-flex justify-content-center">
                            <p className='lead'>PTZ Controls</p>
                        <label className="form-label" htmlFor="customRange1">Pan <span className='lead' style={{float:'right'}}>{pan}</span></label>
                        <div className="row range w-50">
                            <input type="range" className="form-range" id="customRange1" value={pan} onChange={(e) => setPan(e.target.value)} min="0" max="360" step="1"/>
                        </div>
                        <label className="form-label" htmlFor="customRange1">Zoom <span className='lead' style={{float:'right'}}>{zoom}</span></label>
                        <div className="row range w-50">
                            <input type="range" className="form-range" id="customRang32" value={zoom} onChange={(e) => setZoom(e.target.value)} min="0" max="100" step="1" />
                        </div>
                        <label className="form-label" htmlFor="customRange1">Tilt <span className='lead' style={{float:'right'}}>{tilt}</span></label>
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
                <div className='col-md-8' style={{backgroundColor:'#eeee'}}>
                <div className='mb-3 d-flex justify-content-center'> 
                {view == "camera" ? <CameraFeed cameraId={camera} view={view} live={live}/> :
                                <GoogleMap mapContainerStyle={mapStyles} zoom={center.zoom} center={center.center} >
                                </GoogleMap>
                }
                </div>
                    
                </div>
            <div className='row'>
                <div className='col-md-4 px-4 py-2 d-flex justify-content-center' style={{backgroundColor:'#fffff'}}>

                        {view == "map" ? <CameraFeed cameraId={camera} view={view} live={live}/> :
                                <GoogleMap mapContainerStyle={mapStyles} zoom={center.zoom} center={center.center}>
                                </GoogleMap>
                        }
                </div>
                <div className='col-md-8 pe-0 me-0'>
                    <LiveEvents eventClick={eventClick}/>
                </div>
            
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}
  


const VideoComponent = ({ row }) => {
    return (
      <div>
        <img src={row.event} alt="" />
      </div>
    );
  };
  

const data = [
{
    id: 1,
    event: "https://via.placeholder.com/150",
    createdat: "2020-10-10",
    updatedat: "2020-10-10",
    camera: "camera ",
},
{
    id: 2,
    event: "https://via.placeholder.com/150",
    createdat: "2020-10-10",
    updatedat: "2020-10-10",
    camera: "camera ",
},
{
    id: 3,
    event: "https://via.placeholder.com/150",
    createdat: "2020-10-10",
    updatedat: "2020-10-10",
    camera: "camera ",
},
{
    id: 4,
    event: "https://via.placeholder.com/150",
    createdat: "2020-10-10",
    updatedat: "2020-10-10",
    camera: "camera ",
},
{
    id: 5,
    event: "https://via.placeholder.com/150",
    createdat: "2020-10-10",
    updatedat: "2020-10-10",
    camera: "camera ",
},
{
    id: 6,
    event: "https://via.placeholder.com/150",
    createdat: "2020-10-10",
    updatedat: "2020-10-10",
    camera: "camera ",
},
];