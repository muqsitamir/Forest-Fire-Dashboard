import React, { useState, useEffect } from 'react';
import { backend_url } from "../App";
import LiveWeather from './LiveWeather';
import { Table,TableBody, TableCell,TableRow} from "@mui/material";

export default function LiveEvents(props) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [row, setRow] = useState(); // Define the 'setRow' function
  const [view, setView] = useState('camera'); // Define the 'setView' function

  const Header = {};
  Header['Authorization'] = `Token ${localStorage.getItem("token")}`;
  let config = {
    headers: Header,
  };
  const cam_id = props.cam_id ? `?cameras=${props.cam_id}` :  "";

  useEffect(() => {
    fetch(`${backend_url}/core/api/event/${cam_id}`, config)
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            `This is an HTTP error: The status is ${response.status}`
          );
        }
        return response.json();
      })
      .then((actualData) => {
        console.log("here", actualData);
        setData(actualData.results);
        setError(null);
      })
      .catch((err) => {
        console.log(err);
        setError(err.message);
        setData(null);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (<center>
    <h3 style={{background:"#2c3e50",color:"#f39c12",width: "95%",marginBottom:'0px'}}>Events</h3>
    <div style={{overflow:'scroll',height:'48vh'}}>
    <Table className='table table-hover px-0 mx-0' 
    style={{ boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",overflowY: "scroll",width: "95%", }}>
      
      <TableBody>
        {data && data.map((item,index) => (
          <TableRow key={index+1} >
            <TableCell onClick={() => {
              props.eventClick(item);
              setRow(item);
              setView("video");
            }}><LiveWeather data={item}/></TableCell>
            
           
          </TableRow>
        ))}
      </TableBody>
    </Table></div></center>
  );
}
