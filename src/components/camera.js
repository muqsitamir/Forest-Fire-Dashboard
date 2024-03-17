import React, { useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import Table from "react-bootstrap/Table";
import { useParams} from 'react-router';
import Navbar from './NavBar.js';
const VideoComponent = ({ row }) => {
  return (
    <div>
      <img src={row.event} alt="" />
    </div>
  );
};

const Camera = () => {
    const { id } = useParams();
    console.log(id);
  const [view, setView] = useState("camera");
  const [camera, setCamera] = useState("1");
  const date = new Date().toLocaleDateString();
  const [row, setRow] = useState();

  const views = {
    camera: "camera component",
    map: "map component", //<MapContainer />
    video: <VideoComponent row={row} />,
  };
  console.log()
  return (
    <>
    {/*<Navbar/>*/}
    <div className="cameraWrapper">
      <div className="mainContainer container-1">
        <div className="dropdownContainer subContainer">
          <Dropdown>
            <Dropdown.Toggle variant="success" id="dropdown-basic">
              Camera {camera}
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item
                href="#"
                onClick={() => {
                  setCamera("1");
                }}
              >
                Camera 1
              </Dropdown.Item>
              <Dropdown.Item
                href="#"
                onClick={() => {
                  setCamera("2");
                }}
              >
                Camera 2
              </Dropdown.Item>
              <Dropdown.Item
                href="#"
                onClick={() => {
                  setCamera("3");
                }}
              >
                Camera 3
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
        <div
          className="camerabtn subContainer"
          onClick={() => {
            setView("camera");
          }}
        >
          Camera Button
        </div>
        <div
          className="mapbtn subContainer"
          onClick={() => {
            setView("map");
          }}
        >
          Map button
        </div>
      </div>
      <div className="mainContainer container-2">
        <div className="containerr">
          <div className="subContainer controls">Controls</div>
          <div className="subContainer view2">{views.camera}</div>
        </div>
        <div className="view1">{views[view]}</div>
      </div>
      <div className="mainContainer container-3">
        <div className="subContainer additionalinfo">{views.map}</div>
        {/* <div className="subContainer events">{views.video}</div> */}
        <div className="subContainer events">
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Event</th>
                <th>Created At</th>
                <th>Updated At</th>
                <th>Camera</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item) => (
                <tr
                  onClick={() => {
                    console.log("clicked");

                    setRow(item);
                    setView("video");
                  }}
                >
                  <td>{item.id}</td>
                  <td>
                    <img src={item.event} alt="" height={50} width={50} />
                  </td>
                  <td
                    style={{
                      textAlign: "center",
                      verticalAlign: "middle",
                    }}
                  >
                    {item.createdat}
                  </td>
                  <td
                    style={{
                      textAlign: "center",
                      verticalAlign: "middle",
                    }}
                  >
                    {item.updatedat}
                  </td>
                  <td>{item.camera + camera}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>
    </div>
    </>
  );
};

const data = [
  {
    id: 1,
    event: "https://via.placeholder.com/150",
    createdat: "2020-10-10",
    updatedat: "2020-10-10",
    camera: "camera ",
  },
  {
    id: 2,
    event: "https://via.placeholder.com/150",
    createdat: "2020-10-10",
    updatedat: "2020-10-10",
    camera: "camera ",
  },
  {
    id: 3,
    event: "https://via.placeholder.com/150",
    createdat: "2020-10-10",
    updatedat: "2020-10-10",
    camera: "camera ",
  },
  {
    id: 4,
    event: "https://via.placeholder.com/150",
    createdat: "2020-10-10",
    updatedat: "2020-10-10",
    camera: "camera ",
  },
  {
    id: 5,
    event: "https://via.placeholder.com/150",
    createdat: "2020-10-10",
    updatedat: "2020-10-10",
    camera: "camera ",
  },
  {
    id: 6,
    event: "https://via.placeholder.com/150",
    createdat: "2020-10-10",
    updatedat: "2020-10-10",
    camera: "camera ",
  },
];
export default Camera;
