import React, { useState, useEffect,useRef } from 'react';
import { GoogleMap, Marker, Circle, useLoadScript,OverlayView } from '@react-google-maps/api';
import './map.css';
import { backend_url, googleMapsApiKey } from '../App';

export default function MiniMap(props) {
  let camId = props.camId;
  const lightBeamRef = useRef(null);
  const [map, setMap] = useState(null);
  const [circleCenter, setCircleCenter] = useState({ lat: 34.534508, lng: 73.003801 });
  const [circleRadius, setCircleRadius] = useState(0);
  const [isMarkerClicked, setIsMarkerClicked] = useState(false);
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: googleMapsApiKey,
  });
  const fetchData = async () => {
    try {
      console.log(camId);
      const response = await fetch(`${backend_url}/core/api/camera?=${camId}`, {
        headers: {
          Authorization: `Token ${localStorage.getItem('token')}`,
        },
      });
      if (!response.ok) {
        throw new Error('Failed to fetch location');
      }
      const data = await response.json();
      data.results.forEach((camera) => {
        if (camera.id == camId) {
          const latitude = camera.latitude;
          const longitude = camera.longitude;
          setCircleCenter({ lat: latitude, lng: longitude });
        }
      }); // Fetch StreetView data for the fetched camera
    } catch (error) {
      console.error('Error getting user location:', error);
    }
  };

  useEffect(() => {
    fetchData();
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
      // Switch to satellite view
      map.setMapTypeId(window.google.maps.MapTypeId.SATELLITE);
      map.addListener('zoom_changed', handleZoomChange);
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
  const handleZoomChange = () => {
    if (!lightBeamRef.current) return; // Check if the ref has been assigned
  
    // Calculate the scaled height of the light beam based on the new zoom level
    const originalBeamHeight = 180; // Change this to your original beam height in pixels
    const currentZoom = map.getZoom();
    const zoomScaleFactor = Math.pow(2, currentZoom - 8); // Adjust as needed
  
    // Calculate the maximum allowed height based on the circle radius
    const maxAllowedHeight = circleRadius * zoomScaleFactor;
  
    // Calculate the scaled height while ensuring it remains visible (minimum originalBeamHeight)
    const scaledBeamHeight = Math.max(Math.min(originalBeamHeight * zoomScaleFactor, maxAllowedHeight), originalBeamHeight);
  
    // Update the height of the light beam using the ref
    lightBeamRef.current.style.height = `${scaledBeamHeight}px`;
  };
  if (loadError) return <div>Error loading maps</div>;
  if (!isLoaded) return <div>Loading...</div>;

  return (
    <GoogleMap
      onLoad={handleMapLoad}
      center={circleCenter}
      zoom={8}
      mapContainerStyle={{ height: '400px', width: '100%' }}
    >
      {/* Show the marker */}
      <Marker
        position={circleCenter}
        onClick={handleMarkerClick}
        icon={{
          url: 'https://maps.google.com/mapfiles/ms/icons/red-dot.png',
          scaledSize: new window.google.maps.Size(40, 40),
          anchor: new window.google.maps.Point(20, 20),
        }}
      />

      {/* Show the circle */}
      <Circle
        center={circleCenter}
        radius={circleRadius}
        options={{
          fillColor: '#FF0000',
          fillOpacity: 0.3,
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
         <OverlayView
         position={circleCenter}
         mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
        >
        <div
          className="light-beam"
          ref={lightBeamRef}
          style={{
            top: '50%',
            left: '50%',
            transform: `translate(-50%, -50%) rotate(${circleRadius * 0.036}deg)`}}>
        </div>
        </OverlayView>
      )}
    </GoogleMap>
  );
}