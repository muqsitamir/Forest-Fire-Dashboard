import React from 'react'
import { useParams,useLocation } from 'react-router';
export default function EventPage(props) {
  const { id } = useParams();
    const { query} = useLocation(); 
    console.log(id)
  return (
    <>
    {console.log(props)}
    <div>EventPage</div>
    <span>{id}</span> 
    </>
  )
}
