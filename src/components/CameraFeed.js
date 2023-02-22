import React, { useEffect, useState } from 'react'
import {Bars} from 'react-loader-spinner'
import {backend_url} from "../App";

export default function CameraFeed({cameraId,view,live}) {
    const [picture, setPicture] = useState({pic: "", rnd: 0})
    const [loading, setLoading] = useState(true);
    var url = ``
    var headers={};
    const Header = {};
    Header['Authorization'] = `Token ${localStorage.getItem("token")}`;
    let config = {
       headers: Header,
    };


    useEffect(() => {
        const timer = setTimeout(() => {
          var randNum = Math.random() * (10000000)
          var event = 0
          console.log("fetching again", cameraId)
          console.log(cameraId.link, cameraId.cam, url,event)
          
          if(cameraId.link!=''){event = 1}
           else if(cameraId.cam == "Hawa Gali") {url = `${backend_url}/core/api/camera/1`;}
           else if(cameraId.cam == "Panja Gali") {url = `${backend_url}/core/api/camera/2`;}
           else if(cameraId.cam == "Palm Gali") {url = `${backend_url}/core/api/camera/3`;}
           else if(cameraId.cam == "Event") {setPicture({pic: cameraId.link, rnd: randNum});setLoading(false);live=0;}
           console.log(url)
          if(event==1) {setPicture({pic: cameraId.link, rnd: randNum});setLoading(false);}
           else if(live){
             // console.log("url is", useBeforeUnload)
               fetch(url, config)
               .then((response) => {
                 if (!response.ok) {
                     throw new Error(
                       `This is an HTTP error: The status is ${response.status}`
                     );
                   }
                   return response.json();
               })
               .then((actualData) => {
                //  console.log(actualData.imageLink);
                  setPicture({pic: actualData.live_image+'?ver='+randNum, rnd: randNum});}
               )
               .catch((err) => {
                 console.log(err);
                 setPicture({pic:"", rnd: Math.random() * (10000000)});
               })
               .finally(() => {
                setLoading(false);
              });
           }
        }, 5000);
        return () => {
            clearTimeout(timer);
        }
    })

  return (
    <>
    {/* {console.log("picc",picture.pic)} */}
    <div className='my-5 py-5' style={{display:loading?"block":"none"}}><Bars radius="9" color="#0D6EFD" height="50" width='50'/></div>
    <div className='d-flex justify-content-center' style={{display:loading?"none":"block",maxWidth:view=='map'?"75%":"50%",maxHeight:view=='map'?"75%":"50%", paddingTop:view=='map'?"20px":"10px"}}>
      <img style={{display:loading?"none":"block"}} src={picture.pic} alt="camera feed" className="w-100"/>
      </div>

    </>
  )
}
