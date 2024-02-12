import React, { useState, useEffect, useRef } from 'react';
import {
  GoogleMap,
  Marker,
  Circle,
  useLoadScript,
  OverlayView,
  InfoWindow,
  Polygon,
} from '@react-google-maps/api';
import './map.css';
import { backend_url, googleMapsApiKey } from '../App';
import JSZip from 'jszip';
import convertXmlToGeoJSON from '../features/events/convertXmlToGeoJSON';

export default function MiniMap(props) {
  let camId = props.camId;
  const lightBeamRef = useRef(null);
  const [map, setMap] = useState(null);
  const [circleCenter, setCircleCenter] = useState({ lat: 34.534508, lng: 73.003801 });
  const [circleRadius, setCircleRadius] = useState(0);
  const [isMarkerClicked, setIsMarkerClicked] = useState(false);
  const [selectedFeature, setSelectedFeature] = useState(null);
  const [fireFootprints, setFireFootprints] = useState('');
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
      });
    } catch (error) {
      console.error('Error getting user location:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const parseKMZ = async () => {
      try {
        const currentDate = new Date();
        const year = currentDate.getFullYear();
        const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
        const day = currentDate.getDate().toString().padStart(2, '0');
        const formattedDate = `${year}${month}${day}`;
        const url = `${backend_url}/media/kmz/${formattedDate}.kmz`;
        console.log("kmz file url:" + url);

        const response = await fetch(url);
        const kmzData = await response.blob();

        const zip = await JSZip.loadAsync(kmzData);
        const kmlFile = Object.values(zip.files).find((file) => file.name.endsWith('.kml'));

        if (kmlFile) {
          const kmlData = await kmlFile.async('text');
          const convertedGeoJSON = await convertXmlToGeoJSON(kmlData);

          if (convertedGeoJSON && convertedGeoJSON.features) {
            const filteredFeatures = convertedGeoJSON.features.filter((feature) => feature);

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

  const handleMapLoad = (map) => {
    setMap(map);
  };

  const handleMarkerClick = () => {
    const newRadius = 3000;

    setCircleRadius(newRadius);

    if (map) {
      map.setMapTypeId(window.google.maps.MapTypeId.SATELLITE);
      map.addListener('zoom_changed', handleZoomChange);
      setIsMarkerClicked(true);

      const circleBounds = new window.google.maps.Circle({
        center: circleCenter,
        radius: newRadius,
      }).getBounds();

      const markerBounds = new window.google.maps.LatLngBounds();
      markerBounds.extend(circleCenter);

      map.fitBounds(markerBounds.union(circleBounds), { padding: 100 });

      const maxZoom = 18;
      if (map.getZoom() > maxZoom) {
        map.setZoom(maxZoom);
      }
    }
  };

  const handleZoomChange = () => {
    if (!lightBeamRef.current) return;

    const originalBeamHeight = 180;
    const currentZoom = map.getZoom();
    const zoomScaleFactor = Math.pow(2, currentZoom - 8);

    const maxAllowedHeight = circleRadius * zoomScaleFactor;

    const scaledBeamHeight = Math.max(Math.min(originalBeamHeight * zoomScaleFactor, maxAllowedHeight), originalBeamHeight);

    lightBeamRef.current.style.height = `${scaledBeamHeight}px`;
  };

  const calculateDistance = (point1, point2) => {
    const R = 6371;
    const lat1 = (Math.PI / 180) * point1.lat;
    const lat2 = (Math.PI / 180) * point2.lat;
    const lon1 = (Math.PI / 180) * point1.lng;
    const lon2 = (Math.PI / 180) * point2.lng;

    const dLat = lat2 - lat1;
    const dLon = lon2 - lon1;

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    const distance = R * c;

    return distance;
  };

  const isWithinRadius = (feature) => {
    if (feature.geometry.type === 'Point') {
      const featurePoint = {
        lat: feature.geometry.coordinates[1],
        lng: feature.geometry.coordinates[0],
      };
      const distance = calculateDistance(circleCenter, featurePoint);
      return distance <= 10;
    }
    return false;
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
      <Marker
        position={circleCenter}
        onClick={handleMarkerClick}
        icon={{
          url: 'https://maps.google.com/mapfiles/ms/icons/red-dot.png',
          scaledSize: new window.google.maps.Size(40, 40),
          anchor: new window.google.maps.Point(20, 20),
        }}
      />

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

      {isMarkerClicked && (
        <OverlayView position={circleCenter} mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}>
          <div
            className="light-beam"
            ref={lightBeamRef}
            style={{
              top: '50%',
              left: '50%',
              transform: `translate(-50%, -50%) rotate(${circleRadius * 0.036}deg)`,
            }}
          ></div>
        </OverlayView>
      )}

      {fireFootprints &&
        fireFootprints.features.map((feature, featureIndex) => {
          if (isWithinRadius(feature)) {
            return (
              <div key={featureIndex} className="confirm-by-nasa-tag">
                Confirm by NASA
              </div>
            );
          }

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
              ></Marker>
            );
          } else {
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
            setSelectedFeature(null);
          }}
        >
          <div>
            <h6>{selectedFeature.properties.name}</h6>
            <p dangerouslySetInnerHTML={{ __html: selectedFeature.properties.description }} />
          </div>
        </InfoWindow>
      )}
    </GoogleMap>
  );
}
