import React from 'react';
import {  Chip ,Avatar} from '@mui/material';
import '../features/events/weather.css';

const smoke = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAACXBIWXMAAAsTAAALEwEAmpwYAAABWElEQVR4nOWUWytEURiGH8WdlJFSyuF2lJBfIadkkks/wMQFfsnc+wNCyYWSMk1SyulerhwuDZJx2Fr17lrtvr2HWbnhra++9a1vvc/aa68W/BdNAwfAk2IfGGvUbADYBKqKEyBKiTJwB9wAG0D+O+bVDMOoTjzUg2wHmEeKrSxAyO4j7ytS9fjbgMOURa/AEtCuWFbN6t1LM58BPjzDFaAX6ABGjX5XyylWgZrWvgOTFuDM24Uzt3QMHKXMrXnrT62GF6+hU7WK7nqTxvE8qlUUTn3e/LMFuPAaulW71njYAIwodz3o/sfz5xZgDvhUw7hq6xoXDUBRuetB5x7Jw3mZmtX5LSRMSgagpHxR43n9xwI/0JRMdgzArvIJAjSUOFMfcKl8MATQL5MrAxBfgJ4QQJdMbg3AfeJKN6S2xPviA+KHsTUE0CKTmgF4U95MoMp6BLPyP6wvXRbIwdx/FvQAAAAASUVORK5CYII=";
const smsIconUrl="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAACXBIWXMAAAsTAAALEwEAmpwYAAABU0lEQVR4nO2Wu0oEQRBFTyiigcL6+ALxEbmZgqaKmaipifgbvvA3/BBNBDEQUcFMQ9fABdFVd42UkoZSirV3nJ7pmUD2wk2aun3o6scMxNUosA9cA+9AC7gAdoERCtIa8AJIBz9rTVStAJ8JUFG7mtVY0EHgMQVU1K4rwzHA23+AHoBpYNaM7cUAnyVA68Ck1lXN+FUMcMtMOKOAunpKayZ05d91b3aCJeA+YK/6NfdqxlxLUWAnqLSDawFQ5zHNXbbtpwORABXN/EgCvaG5Hc9hqqp9UNFMZvCh5oaARkCuAVTygJ3nAh+QD60lL/gGGDDwpCfzCVj2XQvJ6GMDr+gHwR2epl61c2Ar6bWSHL4F5skoieAjYBMYB/qAnrLA4nEX/EvdVsu/P1y1AqB3acCLkeEOupAG7JOdqGn+nwqXGK+XBcVADyhZJ8Ap0Fs2uDB9AWkG0AT7/d55AAAAAElFTkSuQmCC";
const notsmsIconUrl="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAACdElEQVR4nO2YsWsUQRTGf4rFqQjGMkogjYKcvYmCisa/ILE2GiwsbGxUIoildlFrQTQGovEPEAQ7E9BCUWOwO1NcE0WDhTkcefAWluFud3ZvdncO94Ovmbl5+31zb97OW6jx/2IImAGWgDVgU7mmYxf1N8FhJzAL/ABMCr8DN4AGgWAYWHYQbiy+A0aqFr8f+JZDvFG2dAMqS5uVPsQb5XLWdDoOLADrQCfHA09pnJvW+CQwDrQT1srcGDBljcuZSMUO4EGfu/VeY+3rcmBFmKDZw0Rb51Cj9sFOrU79ihfe1lgzKQKblomkuYjTaWljPPC0xnuRkCJNS6iLeOGzJANPPRmIyt7XlDxvxgS7iBd+STKw7slAVC02U37Xjgl3ES/8lWQgT7Xpxl0FGviZZMB44oGqUsh44lmNt1TAIV4sw8Ctqsqo8cSPGm+ozxfZmDW3Aewtw4DwhMactcanHK8S48A5a/x6knjfBt4A27WkrniK1yjTgPBy7DrdKuM6bTzzT+xaMay7mDXG2ywNjSmAGzETDb0Sy63SZd21WNqcrMqAcAu4AmzT50gluQA8B1ZjTf2qXtamY9VG1lzVGJUZiPhBq5Arzlh9dOUGIspO3wEmgEN6d9oDHNS3+F3gU5d1wRjIy9qAqf8Bik2hTgB5bnpQtKXCV0tZBFsuBnw19UXwsYuBo8DfAMSaLjyGI+4FINZYnCMD5NPi/QBEG82GOdWUGdIRzevhKbM6dfSZT2LtpzdkFfMbuERAMBn4GThCYDCOfATsJkCYQUsZGwOXMja2eoh/GGrK2HhtCZc+9jwDhFHgpX6jfwUcrlpQjRrkxz9N+6QOXaY1tgAAAABJRU5ErkJggg==";
const fireIconUrl= "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAACXBIWXMAAAsTAAALEwEAmpwYAAABdklEQVR4nO2WPShGURjHf68o8Q5KSspX2ZSV4R3ekoxWRqNiNBnEZLaYDWJ4IxYDg5TBx/zGoDCwiMhnyauT59bp5H4817nvIP/6L+ee8//dzj3nuQ/8K14HwCGQp4pqBCritWqCByyw8US1wEsO+AFoyxraAjw7YOOVrMHLP0AD92cFHQI+I8AbWUCbgMsIqPEH0OobvBoDDTwl83PADrAH1KSFjiSEGpdkTcEaM59IrTxwowCfy7rt3574WQXU+AmYc8bugToNtEGKQ8WDixrwmCeo8YwGXPII3tKALyKCroFxBfhMA34NCbkFuoFhBfhRA76LKRJ9ytOeWCchIe1WdTpS3u9Emg8JMR1IoF65p3HgzWTIb3UCbwl+fwXZyijwpAaM3D83xHQgrgYjDqNpHJq14FrZJjvoXQ6Wq9EQ8AIpVQ+sO2Gn0ga5cueVpfSmVg6YBl6sUNNXuypaz6+ADjypC1iUyrUf8oK7wDHQ4wvKn9EXpY8rBEsOB3YAAAAASUVORK5CYII=";
const nasaUrl="data:image/png;base64,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";


function LatestEvents(props){
 
    
    let species=props.data.species;
    let img=props.data.thumbnail;
    //img= img.replaceAll("http://127.0.0.1:8000","https://api.forestwatch.org.pk");
    const camera=props.data.camera_name;
    let name=camera;
    if(camera.includes('PTZ')){
     let nameC=camera.split('-');
      name=nameC[1];
      //console.log('name: '+name);
    }
    const date=props.data.date;
    const sms_sent=props.data.sms_sent;
    const nasa=props.data.nasa_tag;
    let file=props.data.file;
   // file=file.replaceAll("http://127.0.0.1:8000","https://api.forestwatch.org.pk");
    // Calculate the index in the array based on wind degree


  
   
        // Handle the case when weather_data is empty or undefined
        return (<>
          <div id="m-booked-custom-widget-35390">
<div className="weather-customize" style={{width:'100%'}}>
    <div className="booked-weather-custom-160 color-009fde" style={{width:'100%'}} id="width3">
        
        <div className="booked-weather-custom-160-main">

            <div className="booked-weather-custom-160-date" style={{color:"black"}}>{date} </div> 
            <div className="booked-weather-custom-160-date" style={{color:"black"}}><p>{name}</p> </div> 
            <div style={{marginRight:'12px',marginLeft:"12px",display: 'flex',marginTop:'5px',alignItems:"center",justifyContent:"space-between"}}>
           
            <a target="_blank" href={file} rel='noreferrer'>
                        <img src={img}  alt='' style={{width:'100px',height:'100px',borderRadius:'13px'}}/>
                      </a>
                     
                     </div>
            

        </div>
       </div>
    </div>
    </div>
             
        </>);
      
  
  
}

export default LatestEvents;
