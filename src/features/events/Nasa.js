import React, { useEffect, useState } from 'react';
//import L from 'leaflet';
import JSZip from 'jszip';
import convertXmlToGeoJSON from './convertXmlToGeoJSON';
import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const fire="data:image/png;base64,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";
/*const defaultIcon = L.icon({
  iconUrl: '/marker-icon-2x.png',
  iconSize: [16, 16], // adjust size as needed
  iconAnchor: [16, 32], // adjust anchor as needed
});*/
const Nasa=() =>{
  const [fireFootprints, setFireFootprints] = useState('');

  useEffect(() => {
    const parseKMZ = async () => {
      try {
        // Fetch the KMZ file
        const response = await fetch('/20240129.kmz');
        const kmzData = await response.blob();

        // Extract the KML file from the KMZ archive
        const zip = await JSZip.loadAsync(kmzData);
        const kmlFile = Object.values(zip.files).find((file) => file.name.endsWith('.kml'));

        if (kmlFile) {
          const kmlData = await kmlFile.async('text');
         //  console.log("xml data:",kmlData)
           const convertedGeoJSON = await convertXmlToGeoJSON(kmlData);
           if (convertedGeoJSON && convertedGeoJSON.features) {
            const filteredFeatures = convertedGeoJSON.features.filter((feature) => feature);
          
           // console.log(filteredFeatures);
          
            // Update state with the filtered features
            setFireFootprints({
              ...convertedGeoJSON,
              features: filteredFeatures,
            });
          }
        //  console.log(convertedGeoJSON);
        } else {
          console.error('No KML file found in the KMZ archive.');
        }
      } catch (error) {
        console.error('Error parsing KMZ:', error);
      }
    };

 

    parseKMZ();
  }, []);
  const mapStyle = {
    height: '600px',
    width: '100%',
  };
  const getFeatureStyle = (feature) => {
    // Customize the style based on feature properties
   return feature.properties.styleUrl
     
  };
  const onEachFeature = (feature, layer) => {
    const popupContent = `<div >${feature.properties.name}</div>`; // Customize based on your data
    layer.bindPopup(popupContent);
  };
  return (
    <MapContainer center={[22.75, 78]} zoom={6} style={mapStyle}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {fireFootprints && <GeoJSON data={fireFootprints} style={getFeatureStyle} onEachFeature={onEachFeature} />}

    </MapContainer>
  );
};


export default Nasa;
