import React, { useEffect, useState, useRef } from 'react';
import { Bars } from 'react-loader-spinner';
import { backend_url } from '../App';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSync, faStop, faPlay, faPause, faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import GifPlayer from '@deepit/react-gif-player';

export default function CameraFeed(props) {
  const [picture, setPicture] = useState({ pic: '', rnd: 0 });
  const cameraId = props.cameraId;
  const view = props.view;
  const live = props.live;
  const [imageUrls, setImageUrls] = useState(props.imageUrls || []);
  const [loading, setLoading] = useState(true);
  const [videoSrc, setVideoSrc] = useState('http://203.135.63.37:8003/ipcam/');
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

  var url = ``;
  const Header = {};
  Header['Authorization'] = `Token ${localStorage.getItem('token')}`;
  let config = {
    headers: Header,
  };

  const refreshImage = () => {
    iframeRef.current.src = videoSrc;
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
          if (link.includes('http://127.0.0.1:8000')) {
            link = link.replace('http://127.0.0.1:8000', 'https://api.forestwatch.org.pk');
          }
          setPicture({ pic: link + '?ver=' + randNum, rnd: randNum });
          setLink(link);
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
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % props.imageUrls.length);
    }else if(e.key=== 'ArrowLeft'){
      setCurrentImageIndex((prevIndex) => (prevIndex - 1 + props.imageUrls.length) % props.imageUrls.length);
  
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', marginTop: '3.0rem' }}>
      <div className='my-5 py-5' style={{ display: loading ? 'block' : 'none' }}>
        <Bars radius='9' color='#0D6EFD' height='50' width='50' />
      </div>

      <div
        className='d-flex justify-content-center'
        style={{
          display: loading ? 'none' : 'flex',
          flexDirection: 'column',
          maxWidth: view === 'map' ? '400px' : '1000px',
          maxHeight: view === 'map' ? '300px' : '400px',
          paddingTop: view === 'map' ? '20px' : '10px',
        }}
      >
        {!loading && livefeed ? (
          <div
            className='d-flex'
            style={{
              flexDirection: 'column',
              alignItems: 'flex-start',
              alignContent: 'center',
              marginTop: '3.5rem !important',
            }}
          >
            <div
              style={{
                flexDirection: 'row',
                alignItems: 'flex-start',
                display: 'flex',
                alignContent: 'center',
              }}
            >
              <button
                onClick={refreshImage}
                style={{
                  width: 'fit-content',
                  background: 'rgb(44, 62, 80)',
                  color: 'rgb(243, 156, 18)',
                  marginBottom: '20px',
                  borderRadius: '5px',
                }}
              >
                <FontAwesomeIcon icon={faSync} />Refresh
              </button>

              <button
                onClick={stopCameraFeed}
                style={{
                  width: 'fit-content',
                  background: 'rgb(44, 62, 80)',
                  color: 'rgb(243, 156, 18)',
                  marginBottom: '20px',
                  borderRadius: '5px',
                }}
              >
                <FontAwesomeIcon icon={faStop} /> Exit Live View
              </button>
            </div>

            <iframe
              ref={iframeRef}
              src={videoSrc}
              title='live'
              style={{
                height: '300px',
                width: '800px',
                maxWidth: view === 'map' ? '400px' : '800px',
              }}
            />
          </div>
        ) : (
          <div style={{ marginTop: '3.5rem!important' }}>
            {!loading && (
              <>
                <div
                  style={{
                    width: '100%',
                    height: '350px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'flex-start',marginBottom:'10px'
                  }}
                >
                  <div style={{display:'flex',flexDirection:'row'}}> 
                  <button
                    onClick={liveFeed}
                    style={{
                      width: 'fit-content',
                      background: 'rgb(44, 62, 80)',
                      color: 'rgb(243, 156, 18)',
                      marginBottom: '20px',
                      borderRadius: '5px',
                    }}
                  >
                 <FontAwesomeIcon icon={faPlay} />   Live View
                  </button>
                  <button
                    onClick={()=>{animationIsPlaying?setAnimationPlay(false):setAnimationPlay(true)}}
                    style={{
                      width: 'fit-content',
                      background: 'rgb(44, 62, 80)',
                      color: 'rgb(243, 156, 18)',
                      marginBottom: '20px',
                      borderRadius: '5px',
                    }}
                  >
                 <FontAwesomeIcon icon={faPlay} />   {animationIsPlaying?'Gif View':'Images View'}
                  </button>
                  {animationIsPlaying&&(
                    <button
                    onClick={()=>{{isTimerPaused?setTimerPaused(false):setTimerPaused(true)}}}
                    style={{
                      width: 'fit-content',
                      background: 'rgb(44, 62, 80)',
                      color: 'rgb(243, 156, 18)',
                      marginBottom: '20px',
                      borderRadius: '5px',
                    }}
                  >
                 <FontAwesomeIcon icon={isTimerPaused?faPlay:faPause} /> {isTimerPaused?'Play':'Pause'}
                  </button>
                  )}
                  
                  
                  </div>
                  {animationIsPlaying?( 
                  <GifPlayer
                    gif={props.imageUrls.length > 0 ? props.imageUrls[currentImageIndex] : picture.pic}
                    paused={isPaused}
                    onTogglePlay={togglePause}
                    autoPlay
                    frame={!isNaN(currentFrame) ? currentFrame : 0}// Use currentFrame to control the frame position
                    style={{ display: loading ? 'none' : 'block', height: '300px', width: '700px' }}
                  />):( <GifPlayer
                    gif={picture.pic}
                    paused={isPaused}
                    onTogglePlay={togglePause}
                    autoPlay
                    style={{ display: loading ? 'none' : 'block', height: '300px', width: '700px' }}
                  />)}
                 
                </div>
                {animationIsPlaying&&( <div
                  style={{
                    width: '100%',
                    height: '100px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: '20px', overflow: 'scroll'
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
                        cursor: 'pointer',
                        border: index === currentImageIndex ? '2px solid #3498db' : 'none',
                      }}
                      onClick={() => setCurrentImageIndex(index)}
                    />
                  ))}
                </div>)}
               

                
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
