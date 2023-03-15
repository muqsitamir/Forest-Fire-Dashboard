import {useState} from 'react'
import { GoogleMap ,Marker, InfoWindow  } from "@react-google-maps/api"

export default function MiniMap() {
    const myCameras = [{name: "Danna Top", location: {lat: 34.439466, lng: 73.347998}}, {name: "Oghi", location: {lat: 34.534508, lng: 73.003801}}]
    const defaultCenter = myCameras[0].location;
    const [ center, setCenter ] = useState({center:defaultCenter, zoom: 8, isZoom:false});
    const [selected, setSelected] = useState(null) 
    const mapStyles = {        
        height: "40vh",
        width: "100%"
      };
    const handleClick = (item) => {
    console.log("in handle")
    setSelected(item)
    }
  return (
    <GoogleMap mapContainerStyle={mapStyles} zoom={center.zoom} center={center.center} >
        {
            myCameras.map(tempCam => {
            return (
                <Marker icon={"http://maps.google.com/mapfiles/ms/icons/red-dot.png"} key={tempCam.id} position={tempCam.location} onClick={()  => handleClick(tempCam)} />
            )
            }
        )}
        {selected &&
        (

            <InfoWindow
            position={selected.location}
            clickable={true}
            onCloseClick={() => setSelected(null)}
        >
            <div style={{ display: "flex",  justifyContent: "space-between" }}>
            <p className='mx-2' style={{fontSize:"15px" }}>{selected.name}</p>
            </div>
        </InfoWindow>
        )}
    </GoogleMap>
  )
}
