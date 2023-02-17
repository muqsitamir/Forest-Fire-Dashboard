import React, { useEffect, useState } from 'react'

export default function CameraFeed() {
    const [picture, setPicture] = useState("")
    useEffect(() => {
      function getAlerts() {
        fetch(`https://forest-fire-dashboard.vercel.app/api/cameraView/1`)
        .then((response) => {
          if (!response.ok) {
              throw new Error(
                `This is an HTTP error: The status is ${response.status}`
              );
            }
            return response.json();
        })
        .then((actualData) => {
          console.log(actualData.imageLink);
          setPicture(actualData.imageLink);
        })
        .catch((err) => {
          console.log(err);
          setPicture("");
        })
      }
      getAlerts()
      const interval = setInterval(() => getAlerts(), 10000)
      return () => {
        clearInterval(interval);
      }
  }, [])

  return (
    <img src={picture} alt="camera feed" class="img-thumbnail" style={{}}/>
  )
}
