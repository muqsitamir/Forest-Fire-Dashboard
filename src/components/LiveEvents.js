import React, {useState, useEffect} from 'react'
import Container from 'react-bootstrap/esm/Container';
import Table from 'react-bootstrap/esm/Table';
import {backend_url} from "../App";
export default function LiveEvents(props) {
    const [row, setRow] = useState();
    const [view, setView] = useState("camera");
    debugger
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
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

  return (
        <table className='table table-hover px-0 mx-0' style={{overflowY: "scroll", height: "16em",display: "block"}}>
                <thead style={{position: "sticky",top:"0"}}>
                <tr>
                    <th scope="col">Event</th>
                    <th scope="col">File</th>
                    <th scope="col">Created At</th>
                    <th scope="col">Updated At</th>
                    <th scope="col">Date</th>
                </tr>
                </thead>
                <tbody>
                {data && data.map((item) => (
                    <tr
                    onClick={() => {
                        props.eventClick(item)

                        setRow(item);
                        setView("video");
                    }}
                    >
                    <td>{item.species.name}</td>
                    <td>
                        <img src={item.file} alt="" height={80} width={80} />
                    </td>
                    <td
                        style={{
                        textAlign: "center",
                        verticalAlign: "middle",
                        }}
                    >
                        {item.created_at}
                    </td>

                    <td
                        style={{
                        textAlign: "center",
                        verticalAlign: "middle",
                        }}
                    >
                        {item.updated_at}
                    </td>
                    <td
                        style={{
                        textAlign: "center",
                        verticalAlign: "middle",
                        }}
                    >
                        {item.date}
                    </td>
                    </tr>
                ))}
                </tbody>
        </table>
    )
}
