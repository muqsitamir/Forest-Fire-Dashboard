import React, {useEffect,useState} from 'react';
import { Grid } from '@mui/material';
import Camera from "../features/cameras/Camera";
import {useDispatch, useSelector} from "react-redux";
import {getCameras, selectCameras} from "../features/cameras/cameraSlice";
import CameraMap from './CameraMap';
import { backend_url } from '../App';  

export default function Cameras() {
   
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getCameras())
    }, []);
    const { results: cameras } = useSelector(selectCameras);
    
   let location={ lat: 34.534508, lng: 73.003801 }
    const [center, setCenter] = useState({
     center:location,
      zoom: 5      
    }); 
    const updateMapCenter = (lat, lng) => {
      let location={ lat: lat, lng: lng } 
      setCenter({ center:location, zoom: 12 });
    };
    //const cameraCount = cameras.length;
   
    return(
        <div className="page">
            <div className="page__content">
                <div className="main-wrapper">
                <header className="header">
              <div className="container">
                <h2 className="header__title">Cameras</h2>
              </div>
            </header>
            <Grid style={{display:'flex',justifyContent:'center'}}>
            <Grid container justify="center" spacing={2} style={{display:"contents"}} >
                            {cameras.map((camera) => (
                                
                                <Camera  content={camera}
                                latestEvent={camera.live_image ? `${camera.live_image}` : 'https://storage.googleapis.com/proudcity/mebanenc/uploads/2021/03/placeholder-image-300x225.png'}
                                updateMapCenter={updateMapCenter} />
                            ))}
                            <div style={{width:'500px',height:'300px',marginTop: '17px',marginLeft:'12px'}}>
                    
                    <CameraMap camera={cameras} defaultCenter={center}/> {/* Include the GoogleMap component here */}
                    </div>
                        </Grid>
           
            </Grid>
    </div>
          
        </div>
      </div>
  
  );
}