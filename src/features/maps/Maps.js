import React, { useEffect } from "react";
import { getCameraNodes, selectMaps } from "./mapsSlice";
import { useDispatch, useSelector } from "react-redux";
import { googleMapsApiKey } from "../../App";
const google = window.google;

export function Maps() {
  const camera_nodes = useSelector(selectMaps);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCameraNodes());

    // Load Google Maps asynchronously
    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${googleMapsApiKey}`;
    script.async = true;
    script.defer = true;
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  useEffect(() => {
    if (camera_nodes && window.google) {
      initMap();
    }
  }, [camera_nodes]);

  const initMap = () => {
    if (camera_nodes) {
      const map = new google.maps.Map(document.getElementById("map"), {
        zoom: 5,
        center: {
          lng: 74.4098,
          lat: 31.4707
        }
      });
      camera_nodes.forEach((camera) => {
        if (camera.live) {
          new google.maps.Marker({
            position: { lat: camera.latitude, lng: camera.longitude },
            title: camera.description,
            map: map,
            label: {
              text: String(camera.id),
              color: "black",
              fontSize: "10px"
            },
            icon: {
              url: "https://maps.google.com/mapfiles/ms/icons/red-dot.png",
              labelOrigin: new google.maps.Point(12, 12)
            }
          });
        }
      });
    }
  };

  return (
    <div
      id="map"
      style={{
        height: "inherit",
        width: "100%",
        marginBottom: "20px"
      }}
    ></div>
  );
}
