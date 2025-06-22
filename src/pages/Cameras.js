import React, { useEffect, useState } from 'react';
import { Grid} from '@mui/material';
import Camera from '../features/cameras/Camera';
import { useDispatch, useSelector } from 'react-redux';
import { getCameras, selectCameras } from '../features/cameras/cameraSlice';
import MiniMap from './MiniMap';
import {Tabs,Tab} from "@mui/material";
export default function Cameras() {

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCameras());
  }, [dispatch]);

  const { results: cameras } = useSelector(selectCameras);
  let location = { lat: 33.734457, lng: 73.045045 };
  const [center, setCenter] = useState({ center: location, zoom: 5 });
  const [showLive, setShowLive] = useState(false);
  const [showOfline,setShowOfline]=useState(false);
  const [tab, setTab] = useState(0);
  const [headingArea, setheadingArea] = useState(null);


  const handleLiveFilter = () => {
    setShowLive(true);
    setShowOfline(false);
  };
  const handleResetFilter = () => {
    setShowLive(false);
    setShowOfline(false);
  };
  const handleOflineFilter = () => {
    setShowLive(false);
    setShowOfline(true);
  };

  const updateMapCenter = (lat, lng) => {
    let location = { lat: lat, lng: lng };
    setCenter({ center: location, zoom: 12 });
  };
  
  const getFilteredCameras = () => {
    let filteredCameras = cameras;

    if (showLive) {
      filteredCameras = filteredCameras.filter((camera) => camera.live === true);
    }
    if (showOfline) {
      filteredCameras = filteredCameras.filter((camera) => camera.live === false);
    }
    

    return filteredCameras;
  };

  const getGridItems = () => {
    const filteredCameras = getFilteredCameras();
  //  console.log("size:"+filteredCameras.length);
    if (filteredCameras.length===0) {
      if(showOfline){
        return (
          <Grid item xs={12} key="no-live-cameras-msg">
            <div style={{ textAlign: 'center', marginTop: '20px' }}>
              <p>No Offline cameras.</p>
            </div>
          </Grid>
        )
      }else{
        return (
          <Grid item xs={12} key="no-live-cameras-msg">
            <div style={{ textAlign: 'center', marginTop: '20px' }}>
              <p>No live cameras.</p>
            </div>
          </Grid>
        )
      }
      }else{
    const gridItems = filteredCameras.map((camera, index) => (
      <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
        <Camera content={camera}  latestEvent={camera.latest_event ? `${camera.latest_event}` : 'https://storage.googleapis.com/proudcity/mebanenc/uploads/2021/03/placeholder-image-300x225.png'}
                               updateMapCenter={updateMapCenter} />
      </Grid>
    ));

    gridItems.splice(2, 0, (
      <Grid item xs={12} sm={6} md={5} key="map">
        <div style={{ width: '100%', maxWidth: '120%', height: '270px', marginTop: "10px", marginLeft: '18px', borderRadius: '25px', overflow: 'hidden' }}>
          <MiniMap camera={filteredCameras} defaultCenter={center} />
        </div>
      </Grid>
    ));
    return gridItems;
  }
    
  };

  return (
    <div className="page">
      <div className="page__content">
        <div className="main-wrapper">
        <header className="header" >
              <div className="container">
              <h2 className="header__title">{headingArea!==null? headingArea+" Cameras":"Cameras"} </h2>
              </div>
            </header>
         
          <div className='grid-div-mobile grid-div'>
            <div>
              <Tabs value={tab} onChange={(e, v) => setTab(v)} aria-label="basic tabs example" sx={{ flex: 9.3 }}>
                <Tab label="All" onClick={handleResetFilter} />
                <Tab label="Live" onClick={handleLiveFilter} />
                <Tab label="Offline" onClick={handleOflineFilter} />
              
                
               
              </Tabs>
             
            </div>

            <Grid container justify="center">
              {getGridItems()}
            </Grid>
          </div>
        </div>
      </div>
    </div>
  );
}