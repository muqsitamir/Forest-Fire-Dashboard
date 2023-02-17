/*global google*/
import React, { useState, useEffect } from 'react'
import { HeatmapLayer  } from "@react-google-maps/api"

function HeatMap() {
    const heatmap_data = [
        new google.maps.LatLng(31.582045, 74.329376),
        new google.maps.LatLng(31.582045, 74.329376),
        new google.maps.LatLng(31.582045, 74.329378), 
        new google.maps.LatLng(31.582045, 74.329380), 
        new google.maps.LatLng(31.582045, 74.329376),
        new google.maps.LatLng(31.582045, 74.329378),
        new google.maps.LatLng(31.582045, 74.329379),
        new google.maps.LatLng(31.582045, 74.329380),
        new google.maps.LatLng(31.582055, 74.329376),
        new google.maps.LatLng(31.582055, 74.329376),
        new google.maps.LatLng(31.582055, 74.329380),
        new google.maps.LatLng(31.582055, 74.329390),
        new google.maps.LatLng(31.582055, 74.329376),
        new google.maps.LatLng(31.582055, 74.329379),
        new google.maps.LatLng(31.582055, 74.329380)
      ]
    return (
        <HeatmapLayer onLoad={() => {console.log("Loaded")}} onUnmount={() => {console.log("Unmounted")}} data={heatmap_data} />
    )
}

export default HeatMap

