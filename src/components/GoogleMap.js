import React, {useState, useEffect} from 'react';
import { GoogleMap, LoadScript, Circle ,Marker, InfoWindow  } from "@react-google-maps/api"
import { Arc } from './Arc';
import HeatMap from './HeatMap';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import SensorList from './SensorList';
import EventList from './EventList'
import {Link} from 'react-router-dom';
import NavBar from './NavBar';
import { AiOutlineZoomIn, AiOutlineZoomOut } from 'react-icons/ai';
import { BsArrowUpRightSquare } from 'react-icons/bs';
import {useSelector} from "react-redux";
import {selectSiteData} from "../reusable_components/site_data/siteDataSlice";
import SideNav from "../Headers/SideNav/SideNav";
import {backend_url} from "../App";

function MapContainer() {
  const defaultCenter = {lat: 34.19167584003779, lng: 73.23095807365446}
  const radius = 300
  const phi = 60 //* Math.PI / 180;
  
  const [ center, setCenter ] = useState({center:defaultCenter, zoom: 10, isZoom:false});
  const [ selected, setSelected ] = useState({ theta : 0, item: {}});

  const { side_nav: side_nav_check } = useSelector(selectSiteData);
  let side_nav = side_nav_check ? <SideNav /> : null;
  
  const mapStyles = {        
    height: "80vh",
    width: "100%"
  };
  const circleOptions = {
    strokeColor: '#FF0000',
    strokeOpacity: 0.8,
    strokeWeight: 2,
    fillColor: '#FF0000',
    fillOpacity: 0.35,
    clickable: false,
    draggable: false,
    editable: false,
    visible: true,
    radius: radius,
    zIndex: 1
  }
  const onSelect = item => {
    console.log(item)
    item.location = item.user ? {lat: item.latitude, lng: item.longitude} : {lat: item.lat, lng: item.lng};
    setSelected({theta: selected.theta, item : item});
  }
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


  return (
   <div className="page">
      <div className="page__content">
        <div className="main-wrapper">
          {side_nav}
    <div style={{ display: 'block' , margin: 5 }}>
        <Row>
          <Col className='col-md-1 mx-0 my-0' style={{width: "20.499999995%",flex: "0 0 20.499%",maxWidth: "20.499%"}}>
            <Row style={{maxHeight:"50%" }}>
            <SensorList sensorSelect={onSelect}/>
            </Row>
            <Row style={{maxHeight:"50%" }}>
            <EventList />
            </Row>
          </Col>
          <Col>
            <div>
          <GoogleMap mapContainerStyle={mapStyles} zoom={center.zoom} center={center.center}>
          {
            data && data.map((item, index) => {
              item.location = {lat: item.lat, lng: item.lng}
              return (
                // console.log("tower markers")
                <Marker icon={"http://maps.google.com/mapfiles/ms/icons/red-dot.png"} key={item.name} position={item.location} onClick={() => onSelect(item)} />
                //<Marker key={item.name} position={item.location} onClick={() => onSelect(item)} />
              )
            })
          }
          {
            center.isZoom &&
            (
              <div>
              {
                data && data.map((item, index) => {
                  return (
                      item.cameras.map((i, idx) => {
                        // icon={{ url: (require('../static/camera.png')), fillColor: '#ffffff', scale: 0.5}}
                        return(
                          <Marker icon={"http://maps.google.com/mapfiles/ms/icons/blue-dot.png"} key={i.description} position={{lat:i.latitude, lng:i.longitude}} onClick={() => onSelect(i)} />)
                      })
                  )
                })
              }
              {
                data && data.map((item, index) => {
                  return (
                      item.sensors.map((i, idx) => {
                        return(
                          <Marker icon={"http://maps.google.com/mapfiles/ms/icons/green-dot.png"} key={i.name} position={{lat:i.lat, lng:i.lng}} onClick={() => onSelect(i)} />)
                      })
                  )
                })
              }
              <Circle options={circleOptions} center={center.center} ></Circle>
              {/* {selected.item.user ? <Arc center={center.center} radius={radius} phi={phi} theta={0} /> : <></>} */}
              {/* <HeatMap /> */}
            </div>
            )
          }
          {

            selected.item.location &&
            (

              <InfoWindow
              position={selected.item.location}
              clickable={true}
              // onCloseClick={() => setSelected({paths: selected.paths, theta: selected.theta, item : {}})}
              onCloseClick={() => setSelected({ theta: selected.theta, item : {}})}
            >
              <div style={{ display: "flex",  justifyContent: "space-between" }}>
              <p className='mx-2' style={{fontSize:"15px" }}>{selected.item.user ? selected.item.description: selected.item.name}</p>
                <span>
                  {center.isZoom ? <a className="px-1" type="button"  onClick={() => setCenter({center:defaultCenter, zoom:10, isZoom:false})}><AiOutlineZoomOut tyle={{verticalAlign: 'baseline'}} color='#000000' size={20}/></a>
                  : <a className="px-1" type="button" onClick={() => setCenter({center:selected.item.location, zoom:12, isZoom:true})}><AiOutlineZoomIn tyle={{verticalAlign: 'baseline'}} color='#000000' size={20}/></a>}
                </span>
                <span style={{align:"centre" }}>
                  {selected.item.user ? <Link target={"framename"} to={`/live/${selected.item.id}`}><BsArrowUpRightSquare style={{verticalAlign: 'baseline'}} color='#000000' size={20}/> </Link> : <a  target="framename1" href={selected.item.name=="Weather-Station Oghi"?"https://thingsboard.cloud/dashboard/1575ba60-9bbb-11ed-8015-91622243936c?publicId=84e5cbd0-9b1e-11ed-9dfd-cfdf96a89571":"https://thingsboard.cloud/dashboard/4d9f5cb0-a201-11ed-9f28-5358e02f9b82?publicId=84e5cbd0-9b1e-11ed-9dfd-cfdf96a89571"}><BsArrowUpRightSquare style={{verticalAlign: 'baseline'}} color='#000000' size={20} /> </a> }
                  {/*{selected.item.device == "camera" ? <Link  target="framename" to={`/live/${selected.item.name}`}><BsArrowUpRightSquare style={{verticalAlign: 'baseline'}} color='#000000' size={20}/> </Link> : ""}*/}
                  {/*/!* {(selected.item.device == "sensor")  ? <Link  target="framename" to={`/sensor/${selected.item.name}`}><BsArrowUpRightSquare style={{verticalAlign: 'baseline'}} color='#000000' size={20} /> </Link> : ""} *!/*/}
                  {/*{(selected.item.device == "sensor")  ? <a  target="framename1" href='https://thingsboard.cloud/dashboard/4d9f5cb0-a201-11ed-9f28-5358e02f9b82?publicId=84e5cbd0-9b1e-11ed-9dfd-cfdf96a89571'><BsArrowUpRightSquare style={{verticalAlign: 'baseline'}} color='#000000' size={20} /> </a> : ""}*/}
                </span>
              </div>
            </InfoWindow>
            )
          }
          </GoogleMap>

            </div>
          </Col>
        </Row>
        </div>
        </div>
      </div>
   </div>
  )
}

export default MapContainer;
