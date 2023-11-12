import React, { useEffect, useState ,useRef} from 'react';
import { Bars } from 'react-loader-spinner';
import { backend_url } from "../App";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSync, faPlay, faStop } from '@fortawesome/free-solid-svg-icons';

export default function CameraFeed({ cameraId, view, live}) {
  const [picture, setPicture] = useState({ pic: "", rnd: 0 });
  const [loading, setLoading] = useState(true);
  const [videoSrc, setVideoSrc] = useState("http://203.135.63.37:8003/ipcam/");
  const iframeRef = useRef(null); // Create a ref for the iframe element
 

  // State variables for tracking button clicks
 const [livefeed,setLive]=useState(false);
const [link,setlink]=useState("")
  var url = ``;
  const Header = {};
  Header['Authorization'] = `Token ${localStorage.getItem("token")}`;
  let config = {
    headers: Header,
  };

 
  // Function to apply PTZ controls
  
  const refreshImage = () => {
    // Refresh the video strea
     // Use the ref to set the iframe's src to the same URL to refresh it
     iframeRef.current.src = videoSrc;
  };

const liveFeed=()=>{
setLive(true);
};


  const stopCameraFeed = () => {
    // Display the stop messag
    setLive(false);
    setPicture({ pic: link + '?ver='  });
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      var randNum = Math.random() * (10000000);
      var event = 0;
      console.log("fetching again", cameraId);
      console.log(cameraId.link, cameraId.cam, url, event);

      if (cameraId.link != '') {
        event = 1;
      } else if (cameraId.cam == "Hawa Gali") {
        url = `${backend_url}/core/api/camera/1`;
      } else if (cameraId.cam == "Panja Gali") {
        url = `${backend_url}/core/api/camera/2`;
      } else if (cameraId.cam == "Palm Gali") {
        url = `${backend_url}/core/api/camera/3`;
      } else if (cameraId.cam == "Event") {
        setPicture({ pic: cameraId.link, rnd: randNum });
        setLoading(false);
        live = 0;
      } else {
        url = `${backend_url}/core/api/camera/` + cameraId.id;
        if(cameraId.id===3){
          setLive(true)
        }
      }
      console.log(url);

      let link = cameraId.link;
      if (link.includes('http://127.0.0.1:8000')) {
        link = link.replaceAll("http://127.0.0.1:8000", "https://api.forestwatch.org.pk");
      }
      if (event == 1) {
        setPicture({ pic: link, rnd: randNum });
        setLoading(false);
      } else if (live) {
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
            let link = actualData.live_image;
            if (link.includes('http://127.0.0.1:8000')) {
              link = link.replaceAll("http://127.0.0.1:8000", "https://api.forestwatch.org.pk");
            }
            setPicture({ pic: link + '?ver=' + randNum, rnd: randNum });
            setlink(link);
          })
          .catch((err) => {
            console.log(err);
            setPicture({ pic: "", rnd: Math.random() * (10000000) });
          })
          .finally(() => {
            setLoading(false);
          });
      }
    }, 5000);
    return () => {
      clearTimeout(timer);
    }
  }, [cameraId, view, live]);
  
  return (
    <div style={{ display: "flex", flexDirection: "column", justifyContent: "flex-start",marginTop:"3.0rem" }}>
      
      <div className='my-5 py-5' style={{ display: loading ? 'block' : 'none' }}>
        <Bars radius='9' color='#0D6EFD' height='50' width='50' />
      </div>
      
      <div
        className='d-flex justify-content-center'
        style={{
          display: loading ? 'none' : 'flex',
          flexDirection:'column',
          maxWidth: view === 'map' ? '400px' : '1000px',
          maxHeight: view === 'map' ? '300px' : '400px',
          paddingTop: view === 'map' ? '20px' : '10px', 
        }}
      >
       { !loading && livefeed ? (
        
        <div className='d-flex'
            style={{
              flexDirection: "column",
              alignItems: "flex-start",
              alignContent: "center",  
              marginTop: "3.5rem !important",
            }}>
              <div style={{
              flexDirection: "row",
              alignItems: "flex-start",
              display:"flex",
              alignContent: "center"
            }}>
            <button onClick={refreshImage} style={{width:"fit-content",
          background:"rgb(44, 62, 80)",
          color:"rgb(243, 156, 18)",
          marginBottom:"20px",borderRadius: "5px"}}>
              <FontAwesomeIcon icon={faSync} />Refresh
            </button>
          
            <button onClick={stopCameraFeed} style={{width:"fit-content",
          background:"rgb(44, 62, 80)",
          color:"rgb(243, 156, 18)",
          marginBottom:"20px",borderRadius: "5px"}}>
              <FontAwesomeIcon icon={faStop} /> Exit Live View
            </button></div> 
            
            <iframe ref={iframeRef} src={videoSrc} 
            style={{
                 height: "400px", 
                 width: "800px" ,
                 maxWidth: view === 'map' ? '400px' : '800px'
                 }} />
                </div> 
       
         
        ) : (<div style={{ marginTop: "3.5rem!important"}}>
          {!loading&&(<button onClick={liveFeed} style={{width:"fit-content",
          background:"rgb(44, 62, 80)",
          color:"rgb(243, 156, 18)",
          marginBottom:"20px",borderRadius: "5px"}}> <FontAwesomeIcon icon={faPlay} />Live View</button>)}
          <a href={link} target="_blank">
            <img
            style={{ display: loading ? 'none' : 'block',height: "400px", width: "1000px"}}
            src={picture.pic}
            alt='camera feed'
            className='w-100'
          /></a>
             </div>
        )}
       
      </div>
    </div>
  );
}