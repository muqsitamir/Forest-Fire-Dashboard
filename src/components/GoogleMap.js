import React, { useState, useEffect } from 'react';
import { GoogleMap,  Circle, Marker, InfoWindow, useLoadScript } from "@react-google-maps/api";
import { Link } from 'react-router-dom';
import { AiOutlineZoomIn, AiOutlineZoomOut } from 'react-icons/ai';
import { BsArrowUpRightSquare } from 'react-icons/bs';
import { useSelector } from "react-redux";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import SideNav from "../Headers/SideNav/SideNav";
import SensorList from './SensorList';
import EventList from './EventList';
import { selectSiteData } from "../reusable_components/site_data/siteDataSlice";
import { backend_url,googleMapsApiKey } from "../App";
import { Polygon } from "@react-google-maps/api";
import JSZip from 'jszip';
import convertXmlToGeoJSON from '../features/events/convertXmlToGeoJSON';
import './map.css';
const icon="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAACp0lEQVR4nO2ZzWtTQRTFp36i7sw7ZxLpQtoUoeha8QsUNy5duBIVt278C9q6UBCrgsuCYHFRxJWu3aqoRcGiLgQRKumbm65EWlssPJk2mlJ8kzSdmTSQA48Q8u6b87szc2feRKmulDLkNUP+FDLzeRnyezVJzgbPsSF/+DYvfyGA6eAAAjwPBSBkFhygUirtFuCiIcc7EmC11ozhcQG+dSyAqmm2UNhXBc4LMCbA144DWKtU6/0CXG6qh4A5FVOtZC51AQEPghqeKRYhwNVa41NrGp8y5EP7e6VUStYDZMgLhjyXKbUtiHFDHhJgQoCFpsayvQ+YSLU+qNqp6d7eXQJcF2CxpYWJ/G3I+6nWe9phfq8Ar3zUdkNO2uEXzbwthQJ89rpIAZ/sc4Obz5TabsgXXs3XIV5/HBzcERRAgHtBzPPfcLodzHw1SQYMuRQYYGm2UDgQBGC5VAY0L3WIRyHMF0NnX1b1Qqo1fQNciWFe6hP6klcAQz6JDPDYK4AAH2ICGPK9bwATGSD1ChBrAksdYMkrQNTxz5XLL0CLO86WL2DBN8DNaBDAogA3vAJ01ZVHdUzlyVMXgN0e2JiaqONzhhwyZJ99xxWg35DDAsxvijlgXPsiYC7V+nBO3BEXhPG9/3EAzDhMDDWIHXHEVmIBTDpM9LliBSg7eu9NFAAB7uaZaHSu86Vc3umAH40CUE2Sk44s9jeIHXDEHo8CkCm1xZDvcrI47IpdPgz+f9xkplSPiiVDnsnJ4rytNjnmj+ZVoVTrU9HMNzxmXIEYsRO2tg6Ua8fwv3Luv6PaoUyprQI829DeCHhqn6PaJdu4IW+1aH4s2N9G65UAxwz5shnjdsKmWp9Wm02ZUj3VJDlhx7QAb+3Kat9va5/2+6gtlVGrjeog/QFNjDplTSKxpwAAAABJRU5ErkJggg==";

function MapContainer() {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: googleMapsApiKey,
  });
  const [map, setMap] = useState(null);
  const defaultCenter = { lat: 34.19167584003779, lng: 73.23095807365446 };
  const radius = 300;
 // const phi = 60;
  const [center, setCenter] = useState({ center: defaultCenter, zoom: 10, isZoom: false });
  const [selected, setSelected] = useState({ theta: 0, item: {} });
  const [circleCenter, setCircleCenter] = useState({ lat: 34.534508, lng: 73.003801 });
  const [circleRadius, setCircleRadius] = useState(0);
  const [isMarkerClicked, setIsMarkerClicked] = useState(false);
  const [fireFootprints, setFireFootprints] = useState('');
  const { side_nav: side_nav_check } = useSelector(selectSiteData);
  const [selectedFeature, setSelectedFeature] = useState(null);

  const side_nav = side_nav_check ? <SideNav /> : null;

  const mapStyles = {
    height: "80vh",
    width: "100%"
  };

 
  useEffect(() => {
    const parseKMZ = async () => {
      try {
        // Fetch the KMZ file
        const currentDate = new Date();
        const year = currentDate.getFullYear();

        const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
         const day = currentDate.getDate().toString().padStart(2, '0');

         const formattedDate = `${year}${month}${day}`;
         const url = `${backend_url}/media/kmz/${formattedDate}.kmz`;
         //const url="/20240201.kmz"
         console.log("kmz file url:"+url)
        const response = await fetch(url);
        const kmzData = await response.blob();

        // Extract the KML file from the KMZ archive
        const zip = await JSZip.loadAsync(kmzData);
        const kmlFile = Object.values(zip.files).find((file) => file.name.endsWith('.kml'));

        if (kmlFile) {
          const kmlData = await kmlFile.async('text');
          const convertedGeoJSON = await convertXmlToGeoJSON(kmlData);

          if (convertedGeoJSON && convertedGeoJSON.features) {
            const filteredFeatures = convertedGeoJSON.features.filter((feature) => feature);

            // Update state with the filtered features
            setFireFootprints({
              ...convertedGeoJSON,
              features: filteredFeatures,
            });
          }
        } else {
          console.error('No KML file found in the KMZ archive.');
        }
      } catch (error) {
        console.error('Error parsing KMZ:', error);
      }
    };

    parseKMZ();
  }, []);

  const onSelect = item => {
    item.location = item.user ? { lat: item.latitude, lng: item.longitude } : { lat: item.lat, lng: item.lng };
    setSelected({ theta: selected.theta, item: item });
    setCircleCenter(item.user ? { lat: item.latitude, lng: item.longitude } : { lat: item.lat, lng: item.lng })
    handleMarkerClick(); 
  };

  const itemSelect = item => {
    setSelected({ theta: selected.theta, item: item });
  };

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true); // Add setLoading state
  const [error, setError] = useState(true); // Add setLoading state
  useEffect(() => {
    fetch(`${backend_url}/core/api/towers/`, {
      headers: {
        Authorization: `Token ${localStorage.getItem("token")}`,
      },
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(`This is an HTTP error: The status is ${response.status}`);
        }
        return response.json();
      })
      .then(actualData => {
        setData(actualData.results);
        setError(null);
      })
      .catch(err => {
        setError(err.message);
        setData(null);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);
  const handleMapLoad = (map) => {
    setMap(map);
  };


  const handleMarkerClick = () => {
    // Calculate the new circle radius (10km in meters)
    const newRadius = 3000;

    // Update the circle radius to 10km (10000 meters)
    setCircleRadius(newRadius);

    // Smoothly animate zoom and pan towards the circle center
    if (map) {
   

      setIsMarkerClicked(true);

      // Calculate the new zoom level to fit both the marker and circle within the visible area
      const circleBounds = new window.google.maps.Circle({
        center: circleCenter,
        radius: newRadius,
      }).getBounds();

      const markerBounds = new window.google.maps.LatLngBounds();
      markerBounds.extend(circleCenter);

      // Fit the map within the combined bounds of the marker and circle
      map.fitBounds(markerBounds.union(circleBounds), { padding: 100 });

      // Optional: Set a maximum zoom level to prevent zooming in too much
      const maxZoom = 18;
      if (map.getZoom() > maxZoom) {
        map.setZoom(maxZoom);
      }
    }
  };

  return (
    <div className="page">
      <div className="page__content">
        <div className="main-wrapper">
          {side_nav}
          <div style={{ display: 'block', margin: 5 }}>
            <Row>
              <Col className='col-md-1 mx-0 my-0' style={{ width: "20.499999995%", flex: "0 0 20.499%", maxWidth: "20.499%" }}>
                <Row style={{ maxHeight: "58%" }}>
                  <SensorList sensorSelect={onSelect} />
                </Row>
                <Row style={{ maxHeight: "15%" }}>
                  <EventList eventClick={itemSelect} />
                </Row>
              </Col>
              <Col>
                <div>
                  {!isLoaded ? (
                    <h1>Loading...{loading}</h1>
                  ) : (
                      <GoogleMap mapContainerStyle={mapStyles} 
                      onLoad={handleMapLoad}
                      zoom={center.zoom} 
                      center={center.center}>
                          
                        {data && data.map((item, index) => {
                          item.location = { lat: item.lat, lng: item.lng };
                          return (
                            <Marker icon={"https://maps.google.com/mapfiles/ms/icons/red-dot.png"} 
                            key={item.name}
                             position={item.location} 
                             onClick={() => onSelect(item)} />
                              

                          );
                        })}
                        {center.isZoom && (
                          <div>
                            {data && data.map((item, index) => {
                              return (
                                item.cameras.map((i, idx) => (
                                  <Marker icon={"https://maps.google.com/mapfiles/ms/icons/blue-dot.png"}
                                   key={i.description} 
                                   position={{ lat: i.latitude, lng: i.longitude }} 
                                   onClick={() => onSelect(i)} />
                                ))
                              );
                            })}
                            {data && data.map((item, index) => {
                              return (
                                item.sensors.map((i, idx) => (<>
                                  <Marker icon={"https://maps.google.com/mapfiles/ms/icons/green-dot.png"}
                                   key={i.name} 
                                   position={{ lat: i.lat, lng: i.lng }} 
                                   onClick={() => onSelect(i)} />
                                   <Circle
                               center={center.center}
                               radius={circleRadius}
                               options={{
                                fillColor: '#FF0000',
                                fillOpacity: 0.1,
                                strokeColor: '#FF0000',
                                strokeOpacity: 0.8,
                                strokeWeight: 2,
                                clickable: false,
                                editable: false,
                                draggable: false,
                                visible: true,
                                zIndex: 1,
                                }}
                                />

                                 {/* Add the rotating light beam effect */}
                                {isMarkerClicked && (
                                 <div
                                  className="light-beam"
                                  style={{top: '50%',left: '50%', height: '95px', transform: `translate(-50%, -50%) rotate(${circleRadius * 0.036}deg)`, // Adjust the rotation factor as needed
                                   }}
                                  />
                                  )}
                            </>
                                ))
                              );
                            })}


                          </div>
                        )}
                        {selected.item.location && (
                          <InfoWindow
                          position={selected.item.location}
                          clickable={true}
                          // onCloseClick={() => setSelected({paths: selected.paths, theta: selected.theta, item : {}})}
                          onCloseClick={() => setSelected({ theta: selected.theta, item : {}})}
                        >
                          <div style={{ display: "flex",  justifyContent: "space-between" }}>
                          <p className='mx-2' style={{fontSize:"15px" }}>{selected.item.user ? selected.item.description: selected.item.name}</p>
                            <span>
                              {center.isZoom ? <a className="px-1" type="button"  
                              onClick={() => setCenter({center:defaultCenter, zoom:10, isZoom:false})}>
                                <AiOutlineZoomOut tyle={{verticalAlign: 'baseline'}} color='#000000' size={20}/></a>
                              : <a className="px-1" type="button" onClick={() => setCenter({center:selected.item.location, zoom:12, isZoom:true})}>
                                <AiOutlineZoomIn tyle={{verticalAlign: 'baseline'}} color='#000000' size={20}/></a>}
                            </span>
                            <span style={{align:"centre" }}>
                              {selected.item.user ? <Link target={"framename"} to={`/live/${selected.item.id}`}><BsArrowUpRightSquare style={{verticalAlign: 'baseline'}} color='#000000' size={20}/> </Link> : <a  target="framename1" href={selected.item.things_board_link}><BsArrowUpRightSquare style={{verticalAlign: 'baseline'}} color='#000000' size={20} /> </a> }
                              {/*{selected.item.device == "camera" ? <Link  target="framename" to={`/live/${selected.item.name}`}><BsArrowUpRightSquare style={{verticalAlign: 'baseline'}} color='#000000' size={20}/> </Link> : ""}*/}
                              {/*/!* {(selected.item.device == "sensor")  ? <Link  target="framename" to={`/sensor/${selected.item.name}`}><BsArrowUpRightSquare style={{verticalAlign: 'baseline'}} color='#000000' size={20} /> </Link> : ""} *!/*/}
                              {/*{(selected.item.device == "sensor")  ? <a  target="framename1" href='https://thingsboard.cloud/dashboard/4d9f5cb0-a201-11ed-9f28-5358e02f9b82?publicId=84e5cbd0-9b1e-11ed-9dfd-cfdf96a89571'><BsArrowUpRightSquare style={{verticalAlign: 'baseline'}} color='#000000' size={20} /> </a> : ""}*/}
                            </span>
                          </div>
                        </InfoWindow>
                        )}
                        {fireFootprints && fireFootprints.features.map((feature, featureIndex) => {
  if (feature.geometry.type === 'Polygon') {
    return (
      <Polygon
        key={featureIndex}
        path={feature.geometry.coordinates[0].map((coordinate) => ({
          lat: coordinate[1],
          lng: coordinate[0],
        }))}
        options={{
          fillColor: '#FF0000',
          fillOpacity: 0.4,
          strokeColor: '#000000',
          strokeOpacity: 1,
          strokeWeight: 2,
        }}
      />
    );
  } else if (feature.geometry.type === 'Point') {
    // Handle Point geometry
    return (
      <Marker
        key={featureIndex}
        position={{
          lat: feature.geometry.coordinates[1],
          lng: feature.geometry.coordinates[0],
        }}
        icon={{
          url: '/marker-icon-2x.png',
          scaledSize: new window.google.maps.Size(18, 18), 
        }}
    
        onClick={() => {
          setSelectedFeature(feature);
        }}
      >
     
      </Marker>
      
    );
    
  } else {
    // Handle other geometry types as needed
    return null;
  }
  
})}
   {selectedFeature && (
  <InfoWindow
    position={{
      lat: selectedFeature.geometry.coordinates[1],
      lng: selectedFeature.geometry.coordinates[0],
    }}
    onCloseClick={() => {
      // Clear the selected feature when InfoWindow is closed
      setSelectedFeature(null);
    }}
  >
    <div>
      {/* Customize the content inside the InfoWindow */}
      <h6>{selectedFeature.properties.name}</h6>
      <p dangerouslySetInnerHTML={{ __html: selectedFeature.properties.description }} />
   </div>
  </InfoWindow>
)}
                      </GoogleMap>
                    )}
                </div>
              </Col>
            </Row>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MapContainer;
