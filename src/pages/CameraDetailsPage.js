// CameraDetailsPage.js
import React,{useState,useEffect} from 'react';
import { useParams } from 'react-router-dom';
import LiveChart from '../features/charts/LiveChart';

import './CameraDetailsPage.css';
function CameraDetailsPage() {
  const { id } = useParams(); 
  const [selectedCamera, setSelectedCamera] = useState('');
 const [cameraId,setCameraId]=useState(0);

  useEffect(() => {
    if (id === '1') {
      setSelectedCamera('PTZ-Oghi');
      setCameraId(1);
    }
    if (id === '3') {
      setSelectedCamera('PTZ-Danna Top')
      setCameraId(3);
    }
    if (id === '4') {
      setSelectedCamera('Test');
      setCameraId(4);
    }
    if (id === '5') {
      setSelectedCamera('PTZ-Oghi Solar')
      setCameraId(5);
    }
    if (id === '6') {
      setSelectedCamera('PTZ-Chowki Top');
      setCameraId(6);
    }if(id==='7'){
      
      setSelectedCamera('PTZ-Susal Gali');
      setCameraId(7);
    }else{
      setCameraId(id)
    }
    
    
    
  }, [id]);

 
  return (
    <div className="page">
    <div className="page__content">
      <div className="main-wrapper">
      <header className="header" >
              <div className="container">
              <h2 className="header__title">Statistics</h2>
              </div>
            </header>
        
        
          <div className="main-content">
        

        <div className="content-container"style={{display: 'flex', flexDirection: 'row',flexWrap: 'wrap',justifyContent:'space-around',alignItems:'center'}}>
       
        
            <div className="chart-container" style={{width: '100%',display:'flex',flexDirection:'column',justifyContent:'center',borderRadius:'20px',background:'white',height: '500px',alignItems:'center'}}>
              
              <LiveChart cameraId={id} cameraName={selectedCamera} />
            </div>
            
        </div>
      </div>
        </div></div>
    
    </div>
  );
}

export default CameraDetailsPage;
