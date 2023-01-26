import React, { useState, useEffect } from 'react'
import { Polygon  } from "@react-google-maps/api"

export const Arc = ({center, phi, radius, theta}) => {
    const [prm, setPrm] = useState({paths: [], theta : 0})

    useEffect(() => {
        var temp = drawSector(radius, center, theta, phi)
        console.log("I ran")
        setPrm({paths: temp, theta: theta})

        return () => {
            console.log("I unmounted")
        };
      }, []);

    useEffect(() => {
        const timer = setTimeout(() => {
            if( (prm.theta+90) < 360) {
                console.log("I re-rendered 10")
                var tempSec = drawSector(radius, center, prm.theta+90, phi) 
                setPrm({paths: tempSec, theta : prm.theta+90});
            }
            else {
                console.log("I re-rendered 0")
                var tempSec = drawSector(radius, center, 0, phi) 
                setPrm({paths: tempSec, theta : 0});
            }
        }, 5000);

        return () => {
            clearTimeout(timer);
        }
    })

    return (
        <Polygon
                paths  = {prm.paths}
                fillColor     = "#BF5E4B"
                fillOpacity   = {0.45}
                strokeColor   = "#6B352A"
                strokeOpacity = {0.9}
                strokeWeight  = {1}
        />
  )
}


function drawSector(radius, p1, theta, phi) {
    var d = radius/6378800; // 6378800 is Earth radius in meters
    var lat0 = (Math.PI/180)* p1.lat;
    var lon0 = (Math.PI/180)* p1.lng;
    var tc = (Math.PI/180)*theta;
    var pc = (Math.PI/180)*(theta+phi);
    
    var y = Math.asin(Math.sin(lat0)*Math.cos(d)+Math.cos(lat0)*Math.sin(d)*Math.cos(tc)); // calculate 1st point
    var dlng = Math.atan2(Math.sin(tc)*Math.sin(d)*Math.cos(lat0),Math.cos(d)-Math.sin(lat0)*Math.sin(y));
    var x = ((lon0-dlng+Math.PI) % (2*Math.PI)) - Math.PI ;
    
    var y2 = Math.asin(Math.sin(lat0)*Math.cos(d)+Math.cos(lat0)*Math.sin(d)*Math.cos(pc)); // calculate 2nd point
    var dlng2 = Math.atan2(Math.sin(pc)*Math.sin(d)*Math.cos(lat0),Math.cos(d)-Math.sin(lat0)*Math.sin(y2));
    var x2 = ((lon0-dlng2+Math.PI) % (2*Math.PI)) - Math.PI ;
    
    var lat1 = y*(180/Math.PI);
    var lon1 = x*(180/Math.PI);
    
    var lat2 = y2*(180/Math.PI);
    var lon2 = x2*(180/Math.PI);
    return [{lat: p1.lat, lng: p1.lng}, {lat: lat1, lng: lon1}, {lat: lat2, lng: lon2} ];
    }