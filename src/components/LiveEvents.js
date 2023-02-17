import React, {useState, useEffect} from 'react'
import Container from 'react-bootstrap/esm/Container';
import Table from 'react-bootstrap/esm/Table';
export default function LiveEvents({eventClick}) {
    const [row, setRow] = useState();
    const [view, setView] = useState("camera");

    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch(`http://139.162.11.234/core/api/event`, {headers: {'Authorization': 'Token c6b660105249117a0677894f23334166698c9fff'}})
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
        <table className='table table-dark table-hover px-0 mx-0' style={{overflowY: "scroll", height: "16em",display: "block"}}>
                <thead style={{position: "sticky",top:"0"}}>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Image</th>
                    <th scope="col">Headline</th>
                    <th scope="col">Severety</th>
                    <th scope="col" style={{textAlign:"center"}}>Detail</th>
                    <th scope="col">Location</th>
                    <th scope="col">Date</th>
                    <th scope="col">Time</th>
                </tr>
                </thead>
                <tbody>
                {data && data.map((item) => (
                    <tr
                    onClick={() => {
                        eventClick(item)

                        setRow(item);
                        setView("video");
                    }}
                    >
                    <td>id</td>
                    <td>
                        <img src={item.file} alt="" height={50} width={50} />
                    </td>
                    <td
                        style={{
                        textAlign: "center",
                        verticalAlign: "middle",
                        }}
                    >
                        Random Headline
                    </td>
                    <td
                        style={{
                        textAlign: "center",
                        verticalAlign: "middle",
                        }}
                    >
                        Random severety
                    </td>
                    <td
                        style={{
                        textAlign: "center",
                        verticalAlign: "middle",
                        }}
                    >
                        Random Detail
                    </td>
                    <td
                        style={{
                        textAlign: "center",
                        verticalAlign: "middle",
                        }}
                    >
                        {item.camera==1?'Hawa Gali':item.camera==2?'Panja Gali':'Palm Gali'}
                    </td>
                    <td
                        style={{
                        textAlign: "center",
                        verticalAlign: "middle",
                        }}
                    >
                        {(new Date(item.date)).getDate()}/{(new Date(item.date)).getMonth()+1}/{(new Date(item.date)).getFullYear()}
                    </td>
                    <td
                        style={{
                        textAlign: "center",
                        verticalAlign: "middle",
                        }}
                    >
                        {(new Date(item.date)).toLocaleTimeString()}</td>
                    </tr>
                ))}
                </tbody>
        </table>
    )
}
