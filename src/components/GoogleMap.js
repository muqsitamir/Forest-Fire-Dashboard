import React, {useState, useEffect} from 'react';
import { GoogleMap, LoadScript, Circle ,Marker, InfoWindow  } from "@react-google-maps/api"
import { Arc } from './Arc';
import HeatMap from './HeatMap';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import SensorList from './SensorList';
import EventList from './EventList'
import sensors from "../static/sensors.json";
import {Link} from 'react-router-dom';
import NavBar from './NavBar';
import { AiOutlineCamera } from 'react-icons/ai';
import { CiTempHigh } from 'react-icons/ci';
import { WiHumidity } from 'react-icons/wi';
import { BsArrowUpRightSquare } from 'react-icons/bs';

function MapContainer() {
  console.log("Came here")
  const defaultCenter = {lat: 31.582045, lng: 74.329376}
  const radius = 500
  const phi = 60 //* Math.PI / 180;
  
  const [ center, setCenter ] = useState({center:defaultCenter, zoom: 12, isZoom:false});
  const [ selected, setSelected ] = useState({ theta : 0, item: {}});

  
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
  const arcOptions = {
    fillColor: "lightblue",
    fillOpacity: 1,
    strokeColor: "lightblue",
    strokeOpacity: 1,
    strokeWeight: 2,
    clickable: false,
    draggable: false,
    editable: false,
    geodesic: false,
    zIndex: 5
  }
  const onSelect = item => {
    console.log("I was called", selected)
    item.location = {lat: item.lat, lng: item.lng}
    console.log(item)
    setSelected({theta: selected.theta, item : item});
  }
  const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
      // fetch(`https://forest-fire-dashboard.vercel.app/api/towers`)
      fetch(`http://127.0.0.1:8000/api/towers`)
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

  
  const sensorSelect = (item) => {
    console.log(item)
    item.location = {lat: item.lat, lng: item.lng}
    // setCenter({center:item.location, zoom:15, isZoom:true})
    setSelected({theta: selected.theta, item : item});

  }

  return (
    <><NavBar />
  <div style={{ display: 'block' , padding: 10 }}>
        <Row>
          <Col className='col-md-1 mx-0' style={{width: "20.499999995%",flex: "0 0 20.499%",maxWidth: "20.499%"}}>
            <Row style={{maxHeight:"50%" }}>
            <SensorList sensorSelect={sensorSelect}/>
            </Row>
            <Row style={{maxHeight:"50%" }}>
            <EventList />
            </Row>
          </Col>
          <Col>
            <div>
          <LoadScript googleMapsApiKey='AIzaSyDhUG9a3aSzkdUT5cnKlTZAkhPy2790zEY' onError={(e) => console.log(e)} libraries={["visualization"]}>
            {console.log("reached here")}
            <GoogleMap mapContainerStyle={mapStyles} zoom={center.zoom} center={center.center }>
            {data && console.log(data)}
            {
              data && data.map((item, index) => {
                item.location = {lat: item.lat, lng: item.lng}
                console.log(item)
                return (
                  <Marker key={item.name} position={item.location} onClick={() => onSelect(item)} />
                  )
              })
            }
            {
              center.isZoom && 
              (
                <div>
                  {
                  sensors.map((item, index) => {
                          return (
                            <Marker key={item.id} position={item.location} onClick={() => onSelect(item)} />)
                      })
                  }
                  <Circle options={circleOptions} center={center.center} ></Circle>
                  <Arc center={center.center} radius={radius} phi={phi} theta={0} />
                  <HeatMap />
                </div>
              )
            }
            {
              selected.item.location && 
              (
                <InfoWindow
                position={selected.item.location}
                clickable={true}
                onCloseClick={() => setSelected({paths: selected.paths, theta: selected.theta, item : {}})}
              >
                <div>
                <h5>{selected.item.name}</h5>
                <p style={{marginBottom:"0px" }}>This is some information about it:</p><br/>
                <p style={{marginBottom:"0px"}}>Latitude: {selected.item.location.lat}</p><br/>
                <p>Longitude: {selected.item.location.lng}</p>
                <div style={{ display: "flex",  justifyContent: "space-between" }}>
                  <span>
                    {center.isZoom ? <button type="button" class="btn btn-primary btn-sm" style={{font:"15px" }} onClick={() => setCenter({center:defaultCenter, zoom:12, isZoom:false})}>Back to Default</button>
                    : <button type="button" class="btn btn-primary btn-sm"  style={{font:"15px" }} onClick={() => setCenter({center:selected.item.location, zoom:15, isZoom:true})}>Zoom into this tower</button>}
                  </span>
                  <span style={{align:"centre" }}>
                    {selected.item.device == "camera" ? <Link  target="framename" to="camera"><BsArrowUpRightSquare style={{verticalAlign: 'baseline'}} color='#000000' size={20}/> </Link> : ""}
                    {(selected.item.device == "sensor")  ? <Link  target="framename" to="sensor"><BsArrowUpRightSquare style={{verticalAlign: 'baseline'}} color='#000000' size={20} /> </Link> : ""}
                  </span>
                </div>
                </div>
              </InfoWindow>
              )
            }
            </GoogleMap>

          </LoadScript> 
            </div>
          </Col>
        </Row>
  </div>
  </>
  )
}

export default MapContainer;
