import { createSlice } from '@reduxjs/toolkit'
import axios from "axios";
import {showLoadingScreen, setSnackBar} from "../../reusable_components/site_data/siteDataSlice";
import {backend_url} from "../../App";




export const cameraSlice = createSlice({
  name: 'cameras',
  initialState: {
      cameras: {
          "count": 0,
          "next": null,
          "previous": null,
          "results": [],
          "img":null
      },
  },
  reducers: {
      setCameras: (state, action) => {
          state.cameras.count = action.payload.count;
          state.cameras.next = action.payload.next;
          state.cameras.previous = action.payload.previous;
          state.cameras.results = action.payload.results;
          state.cameras.img=action.payload.results.map(camera => ({
            ...camera,
            lastRecordedImage: null,
          }));
        },
        setLastRecordedImage: (state, action) => {
          const { cameraId, imageUrl } = action.payload;
          const cameraIndex = state.cameras.results.findIndex(camera => camera.id === cameraId);
          if (cameraIndex !== -1) {
            state.cameras.results[cameraIndex].lastRecordedImage = imageUrl;
          }
        },
      },
    });

const Header = {};
export const getCameras = () => (dispatch, getState) => {
    dispatch(showLoadingScreen(true));
    Header['Authorization'] = `Token ${localStorage.getItem("token")}`;
    let config = {
        headers: Header,
    };
    axios.get(`${backend_url}/core/api/camera/`, config).then((res) => {
        dispatch(setCameras(res.data));
        res.data.results.forEach(camera => {
            // Fetch the latest image for each camera
            console.log("camera id: "+camera.id)
            fetch(`${backend_url}/core/api/event/?cameras=${camera.id}`, config)
            .then((response) => {
                if (!response.ok) {
                    throw new Error(
                      `This is an HTTP error: The status is ${response.status}`
                    );
                  }
                  return response.json();
              }).then((actualData) => {
               
                   console.log("actualData here: "+actualData)
                  const latestImage = actualData.results[0].thumbnail;
                  console.log("latestImage here: "+latestImage)
                  dispatch(setLastRecordedImage({ cameraId: camera.id, imageUrl: latestImage}));
                
              })
              .catch((err) => {
                // Handle error if image fetch fails
                console.log(err);
              });
          });


    }).catch((err) => {
        dispatch(setSnackBar(err.response.data.non_field_errors[0]));
    }).finally(() => {
        dispatch(showLoadingScreen(false));
    })
}


// Action creators are generated for each case reducer function
export const { setCameras, setLastRecordedImage} = cameraSlice.actions
export const selectCameras = (state) => state.cameras.cameras;
export default cameraSlice.reducer

