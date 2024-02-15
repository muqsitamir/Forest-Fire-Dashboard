import xml2js from 'xml2js';

const convertXmlToGeoJSON = (xmlString) => {
  return new Promise((resolve, reject) => {
    try {
      const parser = new xml2js.Parser({ explicitArray: false, mergeAttrs: true });
      parser.parseString(xmlString, (error, result) => {
        if (error) {
          reject(error);
        } else {
          try {
            const geojson = parseKML(result.kml.Document);
            resolve(geojson);
          } catch (geojsonError) {
            reject(geojsonError);
          }
        }
      });
    } catch (parseError) {
      reject(parseError);
    }
  });
};

const parseKML = (kmlDocument) => {
  const folders = kmlDocument.Folder;

  if (folders) {
    const features = folders.flatMap(parseFolder);
    return {
      type: 'FeatureCollection',
      features: features,
    };
  } else {
    throw new Error('Missing Folder in KML document');
  }
};

const parseFolder = (folder) => {
  const placemarks = folder.Placemark;

  if (placemarks) {
    return placemarks.map(parsePlacemark);
  } else {
    return [];
  }
};

const parsePlacemark = (placemark) => {
    const point = placemark.Point;
    const polygon = placemark.Polygon;
    //console.log("polygon: ",polygon)
    if (point && point.coordinates) {
      const coordinates = point.coordinates.split(',').map(parseFloat);
      
      if (coordinates.length >= 2) {
        return {
          type: 'Feature',
          geometry: {
            type: 'Point',
            coordinates: coordinates.slice(0, 2), // Exclude altitude for a 2D point
          },
          properties: {
            name: placemark.name,
            description: placemark.description,
            styleUrl: placemark.styleUrl,
            // Add more properties as needed
          },
        };
      }
    }else if (polygon) {
      const coordinatesList = polygon.outerBoundaryIs.LinearRing.coordinates.split(/\s+/);
      var coordslist=coordinatesList.filter(coord => coord.trim() !== '');
      const coordinates = coordslist.map(coord => {
        const [lng, lat] = coord.split(',').map(parseFloat);
        console.log([lng,lat])
        return [lng, lat];
      });
  
      return {
        type: 'Feature',
        geometry: {
          type: 'Polygon',
          coordinates: [coordinates],
        },
        properties: {
          name: placemark.name,
          description: placemark.description,
          styleUrl: placemark.styleUrl,
        },
      };
    }
  
  
    
  };
  

export default convertXmlToGeoJSON;
