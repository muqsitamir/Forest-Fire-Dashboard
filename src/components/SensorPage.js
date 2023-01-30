import React from 'react'
import { useParams,useLocation } from 'react-router';
export default function SensorPage(props) {
  const { id } = useParams();
    console.log(id);
  return (
    <>
    {console.log(props)}
    <div>SensorPage</div>
    return <span>{id}</span> 
    </>
  )
}
