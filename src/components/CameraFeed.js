import React, { useEffect, useState, useRef } from 'react';
import { Bars } from 'react-loader-spinner';
import { backend_url } from '../App';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSync, faStop, faPlay, faPause, faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import GifPlayer from '@deepit/react-gif-player';
import "./button.css"
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import Switch from '@mui/material/Switch';
import { Tooltip ,Modal,Box} from '@mui/material';

const max="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAABb0lEQVR4nO2Zy27CMBBFb/+OdAEBFXnRfnuRgNDnH1BpkCUvUOXHGM9EFsyRvIiIH4dJ7HEMGIbx0FBF2QEYGvp6Dm3U9Kki4suxQWR/Q39sHlLkHcCiQWQIbcwq8gfgDfpsAZy1I6Itsy1INImcI9dOQcIl+hITeYk0KB2ZWCR8H6+SIlCWyUlAWkRLpiShIiItw5FoErlOGfwcDwUZrgRnPNlF6hDKonKG4cxmtXUHxniaSA1olamzmnE6b5bx+VOKQ48SKZkT0px6lbh+ZHYhGkvk79uHlzb3CBqGYRgs1gA+APyEXCyXY/0CmACM6Az3b0H0MjGewm9dLogukqJ8Zu7/6jFFcYkEcJOps5kzaRwBfId/b9lBGj8yxhNlKnxFbJG4pY2pMJ4kua1lzc6uBHenSdJ7dkmJGhmSFNGQ4MqQlIimBEeGpETu5pMpKUaCExmSFtGW4MqwoYpiZ4i9Hb2RnSHOcIZoGMadcQF8l1ClZ2yIwQAAAABJRU5ErkJggg==";
export default function CameraFeed(props) {
  const [picture, setPicture] = useState({ pic: '', rnd: 0 });
  const cameraId = props.cameraId;
  console.log(cameraId)
  const view = props.view;
  const live = props.live;
  const stream=props.liveStream;
  const [imageUrls, setImageUrls] = useState(props.imageUrls || []);
  const [loading, setLoading] = useState(true);
  const [videoSrc, setVideoSrc] = useState(props.liveStream);
  const iframeRef = useRef(null);
  const [isPlaying, setPlay] = useState(true);
  const [isPaused, setPaused] = useState(false);
  const [livefeed, setLive] = useState(live);
  const [link, setLink] = useState('');
  const [gifFrame, setGifFrame] = useState(0);
  const [currentFrame, setCurrentFrame] = useState(0);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [timerInterval, setTimerInterval] = useState(1000); // 1 seconds interval
  const [isTimerPaused, setTimerPaused] = useState(false);
  const [timerId, setTimerId] = useState(null);
  const [animationIsPlaying, setAnimationPlay] = useState(false);
  const [isOverflow, setIsOverflow] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const scrollContainerRef = useRef(null);
  var url = ``;
  const Header = {};
  Header['Authorization'] = `Token ${localStorage.getItem('token')}`;
  let config = {
    headers: Header,
  };

  const refreshImage = () => {
    iframeRef.current.src = props.liveStream;
  };
  const checkOverflow = () => {
    const scrollContainer = scrollContainerRef.current;
    //console.log("scrollWidth:"+scrollContainer.scrollWidth)
   // console.log("clientWidth:"+scrollContainer.clientWidth)
    if (scrollContainer) {
      setIsOverflow(scrollContainer.scrollWidth > scrollContainer.clientWidth);
    }
  };
  const liveFeed = () => {
    setLive(true);
    props.changeLive(true);
    setPlay(!isPlaying);
    setTimerId((prevTimerId) => {
      if (prevTimerId) {
        clearInterval(prevTimerId);
        return null;
      }
      return setInterval(() => {
        setGifFrame((gifFrame) => gifFrame + 1);
        setCurrentFrame(gifFrame);
      }, timerInterval);
    });
    HandleSubmit("on","live")
  };

  const pauseGif = () => {
    setPaused(true);
    setPlay(false);
    clearInterval(timerId);
  };

  const playGif = () => {
    setPaused(false);
    setPlay(true);
    setGifFrame((gifFrame) => gifFrame + 1);

    setTimerId(setInterval(() => {
      setGifFrame((gifFrame) => gifFrame + 1);
      setCurrentFrame(gifFrame);
    }, timerInterval));
  };

  const togglePause = () => {
    if (isPaused) {
      playGif();
    } else {
      pauseGif();
    }
  };

  const stopCameraFeed = () => {
    props.changeLive(false);
    setLive(false);
    setPicture({ pic: link + '?ver=' });
    HandleSubmit("off","offline")
  };

  const toggleAnimationPlay = () => {
    setImageUrls(props.imageUrls || []); // Set imageUrls before toggling animation
    setAnimationPlay((prevPlay) => !prevPlay);
  };

  useEffect(() => {
    const randNum = Math.random() * 10000000;
    var event = 0;
  
    if (cameraId.link !== '') {
      event = 1;
    } else if (cameraId.cam === 'Hawa Gali') {
      url = `${backend_url}/core/api/camera/1`;
    } else if (cameraId.cam === 'Panja Gali') {
      url = `${backend_url}/core/api/camera/2`;
    } else if (cameraId.cam === 'Palm Gali') {
      url = `${backend_url}/core/api/camera/3`;
    } else if (cameraId.cam === 'Event') {
      setPicture({ pic: cameraId.link, rnd: randNum });
      setLoading(false);
    } else {
      url = `${backend_url}/core/api/camera/` + cameraId.id;
      if (cameraId.id === 3) {
        setLive(live);
      }
    }
  
    let link = cameraId.link;
  
    if (event === 1) {
      if (link.includes('http://127.0.0.1:8000')) {
        link = link.replace('http://127.0.0.1:8000', 'https://api.forestwatch.org.pk');
      }
      setPicture({ pic: link, rnd: randNum });
      setLoading(false);
    } else {
      fetch(url, config)
        .then((response) => {
          if (!response.ok) {
            throw new Error(`This is an HTTP error: The status is ${response.status}`);
          }
          return response.json();
        })
        .then((actualData) => {
          let link = actualData.live_image;
          
          if(link===null){
            
            setPicture({ pic: '/video.png' + '?ver=' + randNum, rnd: randNum });
           setLink('/video.png');
          }else if(link===''){
            setPicture({ pic: '/video.png' + '?ver=' + randNum, rnd: randNum });
            setLink('/video.png');
          }else{
            if (link.includes('http://127.0.0.1:8000')) {
            link = link.replace('http://127.0.0.1:8000', 'https://api.forestwatch.org.pk');
          }
            setPicture({ pic: link + '?ver=' + randNum, rnd: randNum });
          setLink(link);}
          
        })
        .catch((err) => {
          console.log(err);
          setPicture({ pic: '', rnd: Math.random() * 10000000 });
        })
        .finally(() => {
          setLoading(false);
        });
    }
  
   
  }, [cameraId, view, live]); // Only include necessary dependencies


  useEffect(() => {
    setImageUrls(props.imageUrls || []);
  
    if (animationIsPlaying && !isTimerPaused) {
      setTimerId(
        setInterval(() => {
          setGifFrame((gifFrame) => gifFrame + 1);
          setCurrentFrame(gifFrame);
        }, timerInterval)
      );
    } else {
      clearInterval(timerId);
    }
  
    return () => {
      clearInterval(timerId);
    };
  }, [animationIsPlaying, timerInterval, isTimerPaused, props.imageUrls]);
  
  useEffect(() => {
    const timerId = setInterval(() => {
      if (!isTimerPaused && Array.isArray(props.imageUrls) && props.imageUrls.length > 0) {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % props.imageUrls.length);
      }
    }, timerInterval);
  
    return () => {
      clearInterval(timerId);
    };
  }, [timerInterval, props.imageUrls, isTimerPaused]);
  const handleKeyDown = (e) => {
   
    if (e.key === 'ArrowRight') {
      console.log("ArrowRight")
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % props.imageUrls.length);
    }else if(e.key=== 'ArrowLeft'){
      setCurrentImageIndex((prevIndex) => (prevIndex - 1 + props.imageUrls.length) % props.imageUrls.length);
  
    }
  };
  useEffect(() => {
    checkOverflow();
  }, [props.imageUrls]);
  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollLeft -= 100;
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollLeft += 100;
    }
  };

  
    
    
  let HandleSubmit = async (power,mes) => {
    //  e.preventDefault();
      try {
        // let nam = camera.cam.split(" ")[0]
        let nam =  cameraId.cam.replace(" ", "-");
        console.log("nam is", nam);
        let message=`${nam} is ${mes} `
        let res = await fetch(`${backend_url}/core/api/camera/ptzControlsOn/`, {
          method: "POST",
          body: JSON.stringify({
            pan: props.pan,
            tilt: props.tilt,
            zoom: props.zoom,
            camera: nam,
            power:power,
            message: message,
          }),
          headers: {
            'Content-type': 'application/json;',
            'Authorization': `Token ${localStorage.getItem("token")}`,
          },
        });
        let resJson = await res.json();
        if (res.status === 200) {
          console.log(nam+" is "+mes)
          console.log("ptzcontrol response data:"+JSON.stringify(res.data))
         
        } else {
          console.log(resJson.error);
        }
      } catch (err) {
        console.log(err);
      }
    };
    const handleToggleLiveFeed = () => {
      if (livefeed) {
        stopCameraFeed();
      } else {
        liveFeed();
      }
    };
    const handleMouseEnter = () => {
      setShowButton(true);
    };
  
    const handleMouseLeave = () => {
      setShowButton(false);
    };
  return (
    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start',width:'fit-content', alignItems:'center',margin:'10px',backgroundColor: 'rgba(238, 238, 238, 0.933)',padding:'10px',borderRadius:'25px' }}>
      <div className='my-5 py-5' style={{ display: loading ? 'flex' : 'none',
          
          alignItems:'stretch' }}>
        <Bars radius='9' color='#0D6EFD' height='50' width='50' />
      </div>

      <div
        className='d-flex justify-content-center'
        style={{
          display: loading ? 'none' : 'flex',
          flexDirection: 'column',
          alignItems:'stretch'
        }}
      >
{!loading &&(<div
              style={{
                flexDirection: 'row',
                alignItems: 'flex-start',
                display: 'flex',
                alignContent: 'center',
                justifyContent:'space-between',
                marginTop:'10px'
              }}
            >
             <h5 style={{marginLeft:'10px'}}>{livefeed ?'Live View':cameraId.cam} </h5>
             
             <Tooltip title={livefeed ? "Exit" : "Live View"}>
      <Switch 
        onClick={handleToggleLiveFeed} 
        style={{ marginRight: '5px' }} 
        checked={livefeed} // This controls the on/off state of the switch
      >
        {livefeed ? "Exit" : "Live View"}
      </Switch> <span style={{fontSize:'12px'}}>{livefeed ? "Exit" : "Live View"}</span>
    </Tooltip>
          
         
                 
                  
                  
            </div>)}
           
        {!loading && livefeed ? (
          <div
            className='d-flex'
            style={{
              flexDirection: 'column',
              alignItems: 'center',
              alignContent: 'center',
              marginTop: '3.5rem !important',
              border:'1px solid transperent',
              borderRadius:'25px'
            }}
          >
           

            <iframe
              ref={iframeRef}
              src={stream}
              title='live'
              style={{
                height: '200px', width: '500px',
                borderRadius:'25px'
              }}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            />
             
            <button
                onClick={refreshImage}  style={{marginTop:'10px' }} 
                className="presetButton" 
              >
                <FontAwesomeIcon icon={faSync} />Refresh
              </button>
          </div>
        ) : (
          <div >
            {!loading && (
              <>
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    justifyContent: 'flex-start',marginBottom:'10px'
                  }}
                > 
                  <div style={{display:'flex',flexDirection:'row' ,
                }}> 
                   
                   {isModalOpen && (
                <Modal open={isModalOpen} onClose={closeModal}>
                  <Box>
                    <div className="modal-container">
                      <div className="image-container" style={{display:'flex',justifyContent:'center',alignItems:'center',marginTop:'70px'}}>
                      <GifPlayer
                    gif={props.imageUrls.length > 0 ? props.imageUrls[currentImageIndex] : picture.pic}
                    paused={isPaused}
                    onTogglePlay={togglePause}
                    autoPlay
                    frame={!isNaN(currentFrame) ? currentFrame : 0}// Use currentFrame to control the frame position
                    style={{ display: loading ? 'none' : 'flex', 
                      justifyContent:'center',alignItems:'center',
                    height: '100%', width: '100%' }}
                    onClick={() => setTimerPaused(!isTimerPaused)}
                    /> </div>
                  
                       <div
        ref={scrollContainerRef}
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: '20px',
          overflow: 'hidden',
          scrollBehavior: 'smooth',
        }}
      >
                  
        {props.imageUrls.map((imageUrl, index) => (
          <img
            key={index}
            src={imageUrl}
            alt={`Thumbnail ${index}`}
            style={{
              width: '60px',
              height: '60px',
              margin: '0 5px',
              cursor: 'pointer',  border:'1px solid black',
              borderRadius:'15px',
              border: index === currentImageIndex ? '2px solid #3498db' : 'none',
            }}
            onClick={() => setCurrentImageIndex(index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            tabIndex={0}
          />
        ))}
      </div>
     
                      <button className="close-button" onClick={closeModal} style={{ position: 'absolute', top: '10px', right: '10px', cursor: 'pointer' }}>
                        &times;
                      </button>
                    </div>
                  </Box>
                </Modal>
              )}
                  
                  </div>
                  <GifPlayer
                    gif={props.imageUrls.length > 0 ? props.imageUrls[currentImageIndex] : picture.pic}
                    paused={isPaused}
                    onTogglePlay={togglePause}
                    autoPlay
                    frame={!isNaN(currentFrame) ? currentFrame : 0}// Use currentFrame to control the frame position
                    style={{ display: loading ? 'none' : 'block', 
                    height: '200px', width: '500px',
                    borderRadius:'25px' }}
                    onClick={() => setTimerPaused(!isTimerPaused)}
                    />
                    <button
                    className='presetButton'
                    style={{ marginLeft: '450px',marginTop:'-50px'}} 
                   onClick={openModal}
                  > 
                    <img src={max} style={{width:'20px' ,height:'20px'}} />
                  </button>
                </div>
                {!livefeed&&(<div style={{
          width: '500px',
          height: '100px',display:'flex',alignItems:'center'}}>
            
      {isOverflow && (
        <FontAwesomeIcon
          icon={faChevronLeft}
          size="2x"
          onClick={scrollLeft}
          style={{ cursor: 'pointer', marginRight: '10px' }}
        />
      )}
      
      <div
        ref={scrollContainerRef}
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: '20px',
          overflow: 'hidden',
          scrollBehavior: 'smooth',
        }}
      >
                  
        {props.imageUrls.map((imageUrl, index) => (
          <img
            key={index}
            src={imageUrl}
            alt={`Thumbnail ${index}`}
            style={{
              width: '60px',
              height: '60px',
              margin: '0 5px',
              cursor: 'pointer',  border:'1px solid black',
              borderRadius:'15px',
              border: index === currentImageIndex ? '2px solid #3498db' : 'none',
            }}
            onClick={() => setCurrentImageIndex(index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            tabIndex={0}
          />
        ))}
      </div>
      {isOverflow && (
        <FontAwesomeIcon
          icon={faChevronRight}
          size="2x"
          onClick={scrollRight}
          style={{ cursor: 'pointer', marginLeft: '10px' }}
        />
      )}
    </div>)}
               

                
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
