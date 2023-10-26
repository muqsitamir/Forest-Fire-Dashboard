import React, {useEffect} from 'react';
import { Grid } from '@mui/material';
import Camera from "../features/cameras/Camera";
import {useDispatch, useSelector} from "react-redux";
import {getCameras, selectCameras} from "../features/cameras/cameraSlice";
import {selectSiteData} from "../reusable_components/site_data/siteDataSlice";
import SideNav from "../Headers/SideNav/SideNav";



export default function Cameras() {
   
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getCameras())
    }, []);
    const {results: cameras} = useSelector(selectCameras);
    return(
        <div className="page">
            <div className="page__content">
                <div className="main-wrapper">
                <header className="header">
              <div className="container">
                <h2 className="header__title">Cameras</h2>
              </div>
            </header>
                    
                    <div className='grid-div-mobile grid-div' style={{marginTop:'20px'}}>
                        <Grid container justify="center" spacing={2} >
                            {cameras.map((camera) => (
                                
                                <Camera key={camera.id} content={camera} />
                            ))}
                        </Grid>
                       
                    </div>
                </div>
            </div>
        </div>
    );
}
