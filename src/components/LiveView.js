import React, { useState, useEffect } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import "./live.css";
import { Tooltip } from '@mui/material';
import CameraFeed from './CameraFeed';
import LiveEvents from './LiveEvents';
import { useSelector ,useDispatch} from "react-redux";
import { selectSiteData } from "../reusable_components/site_data/siteDataSlice";
import SideNav from "../Headers/SideNav/SideNav";
import { useLocation, withRouter ,useParams} from "react-router-dom";
import { backend_url } from "../App";
import MiniMap from './MiniMap';
import { LiveFilter } from '../features/filters/LiveFilter';
import { getOrganization, selectOrganization } from "../features/organization/organizationSlice";
import { Title } from 'chart.js';
import { faListCheck } from '@fortawesome/free-solid-svg-icons';
import { update } from 'react-spring';
const up="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAACXBIWXMAAAsTAAALEwEAmpwYAAADVklEQVR4nO2aTUuUURTHf0WvlqX0nhP0BdJsmy1atzH7DFEJrVulLVuXpokfINFdBJUlvZoxFkqakmgQYi5KlGghZhMXjiCDzzjPPfc+cyeeP/w3w3PPOf8z9/XcCylSpEiRIkUKBTJAA3ARaAZagTagDxgAhoVTwDQwBywAS0BOuCS/zck3U+vaDYitNrHdLL4axHdJcBroBObXiSgVTQwdQF0SwvcB3cBqAMLzaWLqAip9iT8BfApA6GYc9TE0KsVwrkw4Dux3mYDuAETFpRkOzia81QAExaWJudZFAjoDEGPLdhcJmA9AiC2/a8VnAhChZY0mAecCEKCl2TFa41IAArRs0iSgOQABWl7VJOBWAAK0bNEkoN1zcI+EPn2YU6Q1+jwG9gTYBewAHnr006NJwAtPQT0V8WvYDfR78mXqCdZ47yGgV8CeDXyZJDz34G9Qk4BRx8G8AfYW8Fch/5hLnx81CZh0GMjbIosVFY6HnjkaW+Orw24Yp1JjhshLR75NjdEacw4C+ABUW5bfhhz4n9Uk4KfSeRao2uSsYRiFKqkMa2L4oUnAb4XjEeBAAduXgWVgBbi+SRKyijh+aRLwx9KpWT0ORtjcBtzeoM19YHtEm2oZSjaxrCSdgAngaIQ90yOeFWj7Gjgc0faQZVV6JckhMAkci7B1CpgpwsY34EyEDZOcsSSHwEIMR1+A4xF2LuRdhRUTdFOBJIwnNQnOFelkKqL0tAW4YVlV/itzxdYN7B4BPiexDM4UGWh9xGam10J4Pnsjzg714tvrRmiyyCCzeTu9jIP1O39VOZm3XR5MYis8EiNIc4jZCZz1VEo3Y/m81A8eJ3UYGooZ5DvZ3OQ8cVl8xI0puIJILkGqCiK9AQjQ8kHIRdFcAryjSUBrAAK0vKlJwLUABGh5RZOApgAEaGlelFmjIQABWpp9iTUyAQgo6fV4uT+QMIc5NToCEFKSe8E11JXxIylThHGCrgAExaXpuc5QGfNkWGqOyb2CU2TK5LXoiIuZv1BP6Ap0TliVbl/o8tUZaoF78g4vhKWu3eWEFxc1smNslAdJ5k3OXXmZ0S/lsmG5L5iWIqWpNi+uE7Eov83KNxPSJis2esRmi/hoFJ/eunqKFClSpEjB/49/l3pIoX36BroAAAAASUVORK5CYII=";
const down="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAACXBIWXMAAAsTAAALEwEAmpwYAAADZklEQVR4nO2aTUtVURSGn6JPyz7oO2/QH0izaTpo3MTsN0QlNG6UNmyepok/QNFZBIUlRd+YoWQZiQUh6sBEiQZidmLDEi6Xe889e699rvvGeeGdXM5ea73r7rP32utsyJAhQ4YMGTIokAOagEtAG9ABdAJDwAjwXjgNzABzwBKwAkTCFfltTp6Zzhs3IrY6xXab+GoS35uCs0APsJAnYrNoYugGGiohfB/QB6wHILyQJqZeoDYt8aeAjwEILceJNF6NWjEcVQk/Aft9JqAvAFG2NK+DtwVvPQBBtjQx1/tIQE8AYlzZ5SMBCwEIceW8VnwuABFa1mkS0ByAAC1NxeiMywEI0LJVk4C2AARoeU2TgNsBCNCyXZOAewEI0PKuJgFDAQjQckCTgGcBCNDS9BOc8dbS2RtgNUUxq+LDNiZnTFg4egrsBM6nVD0uAheA7cAji3EfNAn4ktDJaEEjIiftLF/izR9xOs9+DfDa4mjsjG8JHPwFGouM3QMMehA/KLYK0Si+y403PUZnzCUMcrpEzb0FuOl4nDbi7gBbi9g9BnxOaGdWk4Ali4C/AidL2LlY0AUux18xJexRmdY2a4czflv+a2bNOFHC1pmEr9QP4FyM+EnLmEwynfHHYepOAcdL2DsEPIkZ+0JEFsMRx6bsWqUTEMmqfbiEzW3ybheOuS9bXDEcBMYcY1mr5CsQ5XFc/vFSuCKFjQnwRsxzB2SbdY1D9Qr8VDiOpBYwAuIaLs1lxGvricVKbINRDMdkCrt8hbItxb1vg989BLBRjxtBSWEKn+eefM9UohSOEvBVwu92NZ5PoapSeNxjIIYvgb1lxI949qk6DL3zHMzGXl+stt8tJ0rf/syhKbiGyLAIzhc/HGJDZDCloAwfA7uAHcCDFP30axLQlWJghg+FwTZFO1IOrhK8pUnA9QAEaHlVk4DWAARoaW6UOaMpAAFamiatM3IBCNjUz+PVfkHCHObU6A5AiCvN7VI1Gqr4kpTpQ3pBbwCCbGlmrjfUpnAyTJOTlv2HxDtCNdwWHfex8sfNhN5A14R1mfZx/QZvqJfbI/OBbHVdPhc8W9RJxdgiF5La5QQ2IGf8UensTkl/blY+uS3niViW32blmSkZMyo2BsRmu/hoEZ+pTfUMGTJkyJCB/x//AOLbSKZkyn6XAAAAAElFTkSuQmCC";
const left="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAACXBIWXMAAAsTAAALEwEAmpwYAAAC9UlEQVR4nO2azWpTQRTHf4KKolEUF0ojrhVsBZfGZzDWJ3Cl9B1MfQZtbAl9AEu7VxFL/Ka0aoMfrdbSTUkrSGgRF6IxMnAWIaS35s6ZyaSdP5zNJfec8//nzsc5MxARERERERFhgSyQA64CQ8AwMAJMAdPAnNgSsAxUgRqwCTTENuVZVX6z1PTetPgaEd9DEisnsbuCC8AYsN5EoltmchgFBnwQPwKMA/UAiLeayakEZFyRPw28D4DodlZxMTQy4rjRI/YROKopwHgApDo1MxzUJrx6AIQ6NZNzv4YAYwGQSWtFDQHWAyCS1tZsyWe7kPRfZX99NgJc9kz+i4zbV4o+zY4xNa55JP+56d86BDxQ8jtoI8BNT+Q/AadaYu8HXiv4NhxS47YH8gttyBtcAn4p+C/YCHDPwz9/sk3cM8A3pRh3bQSYckj+HXCiTcyDUgZrxZmwEaDsiLwheLxNvD3ApHIs009IjRmP5JGGh3Y8s6SmRkU5mVng2Bax8o5qjrc2AiwqJvJCGirtcK6lRaZdGqfGilISzxM6NWY4fHVEviE9xtSoKiTwFDi8hf99Mkk1HNqqjQA1y+DlBPI+9hnGvtsI8NMi8ENZ07fCdQ/kjf2wEeBPyqCmkDmQ4Fdrm/s/9jsK0KUh8GgnDIGa40mwGPokWFVI4FmCCHuBJyEvgyu7fSO0qJjIy4St8NlQt8LzHivBKyEWQzMOEnqTIEIhtHK4vNsbIpOOBPDZErtvI0DRoQC+mqJ3bAQYdiyAj7b4rd1+MHLDRoBBTwK4PBozN8pSI+dRgIbsPC8qH46aoZQaWc8CBHc83usXJEwxZ43RAIikNXO71BoDPXxJ6jxKKAVAqFMzX64aMg4qQ5f2IaH0tloRKgGQ287mNWb+pC+hFOicUJfPPqkHqYZ+OdVZC2SpK2pOeJ2iT3aMeakdCnItxdzMeCxH4nNS9CxLk9J0mzeaSGzIs1X5zYK8Mys+JsRnQWLkJaazTz0iIiIiIoKdj3/ph0jRDrlVYgAAAABJRU5ErkJggg==";
const right="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAACXBIWXMAAAsTAAALEwEAmpwYAAADEklEQVR4nO2azWqTQRSGHzeKxrYoVCuNG/e24tYIXkKt6C0ovQdTr0FbW0IvwNBu1J0/sSioNUFSbW2hSFyEtAsJLeJGjZWBI4SSfEm++ckknRfOJnyZc96XmTPnzAwEBAQEBAQEaCAJpIDrwBQwDcwAS0AOKIhtAV+BClAF9oB9sT35rSLfbNX9LydjzcjYU+IrJb67gkvAPLBTR6JbpmKYA8ZdEB8EFoCaB8QPmoopAwzYIn8e+OwB0Va2amNpDMjA+z1i68CQSQEWPCDVqanlYCzh1Twg1KmpmMdMCDDvAZm4NmtCgB0PiMS1bV3yScMB/e2CCKM6Alw1GEhB1uS6YwFUxRgbNwwFkZMiSuEssOZQgEkdAe4YCOAdcPTAuCPAF0cCKA6xcc9AAL+Aaw3GPgN8ciBAWkeAh4aC+A5caDD+KSBvWYAHOgIsGQykCCSaiPDBogBZHQGWDQezCBxp4Oe0xZmgEnBsrDhck0OSME37e6sjwKqFgFQxdKuJv0EJ2KS/jzoCbFqalj8iGpWETFtTvlThFRslSwIo+wYMN/F7AnhpyI86Y4yNikUBlL1pUCTVi/DcgI+yjgBVywK0almPA88M1CCx8dOBAK3K1WPAE818Ext/HAnQrFz+D7VMHscc+3cQoAeWwO0WS+Bpt5ZA1QF5deVFxE7Q1SRYsUz+dYtt8EW3t8GSRfKliEIo4UshtGmJvFqXFyPIv/KlFC5aaoZuRnSEXjVDKxYEuBtB/r1v7fCywwORggXy2gcii31wJPZIR4BZy4eiww6u3e/rCDDdB8fizXJOW7B1MXLO4cVIVJndEpMWrsZGHN8PqhdlsZEyGIjK8pflCdy+Q7uiI0DysF+P9/oDCdXMaWPOAyI2Wu22Md7Dj6SaNVwdI+MBoU5NzVyjDyWLHpBq19bqtl1jSPbIa9GiicwfNRMynuaEmkz7kzjAmLwe2fZkq5s1mfA6xahUjBPSO6TlWUpW7vbyUgVuyPlcWU6bd+tI7MpvZflmQ/6TlzGyMmZafEyIT2tTPSAgICAggP7HP55GSIN5tLLDAAAAAElFTkSuQmCC";
const refresh="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADQAAAA0CAYAAADFeBvrAAAACXBIWXMAAAsTAAALEwEAmpwYAAACkElEQVR4nNWaS0hVURRA1wtz0IeIoo9Wgyb9JKhBoINCpKjoI4EQBE0iHEWpRSPBQJFskk0CiaCEIBKsUaMIos/EosJXzfu86EMgkpjwjAMnEHmes313n0d7wYY3uG/vu+69nM++F9KwCWgFbgLPgALwHtiPIZYA54DXwPSsGAJWYISFwAXgZwmRInAJyGGEbcDbEiL/4iKGOAaMB2SuY4gTwFRAJg9UY4RGYDIgU/THmGAD8Csg4+I2RsgBjyIy7u5swQgtERkXjzHCAuCDQOg0RjgkkHGxDiMMC2TcUG2CpcCEQOgWRjgofNzalOtu9aFOt1DoiGLNej95T/rfqjwQCu1Qqrca+DQjbwGoQZFRoZBG0So/l5Wa36pQ4rtQaJlCrSuB/H0oEVqIzgy30cvCUb90Ci2rWiSJ7gtPOEsMRs5hMzAmyDPmjw1SqgegHa5GqBeRn0euvP9P5qtTbrhdbV2g/t0ycg7H+hTHEwqdDNTtyJC3nQj9CWSuBuo1AH8y5J4C9oSE3Cj1RFHmeaCvsAb4rFDjK1AbkqpEIe0L9yLWkGmYx9xTzqNwLcGj3U+E9gzJ2/7DwSfJcFoXaUxmjd+xBbL2hFeJCXyECi5JXiaWKQI9VHLRGKBaeNITKNEXKHJZIf9yoVABJVJvvNYLhd6gyCrg46yrtVYp9y6h0BDKpGpeNAuFukjATh+anBcK7cUIgwKZcWARRpC8CLiHEWqFj9s+jNAqkBm19GnAU4HQYYywPbKsmgYeYog7EZkf2n3tlOyO3B3XQGnCCG51/S4i43a3ZhiI7K3cO10zdAZkXvlv7UyQA3rnEPkGnNV8B5SalXO8SXc9gDPAYgxxwA8AX3yD8QZwCtiYotpfgNBM3rKRTw4AAAAASUVORK5CYII=";
const zoomIn="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAACXBIWXMAAAsTAAALEwEAmpwYAAAC/0lEQVR4nO2bwUpbURCGP/eNPkAjre6rYrvUvoO171DMK9RqH6BYaLWEIlR3tXVTXRbERSqIpVRsjSDFTUi01KLgSg0pB6YQLhdMzrlzcy45P8wmJuf/Z7xnzszJBAICAgICAgIc0A+MAY+AAjALzAOrwAbwVewQ+AVUgb/AOdAQO5fXqvKew6bPbcha87J2QbjGhLsjGAGKwEmTE52yY9EynIbjvcAiUPfA8agZTW+BnJbz/cCeB47eZLtAPmnnc7JwIyP2E+hLMgCLHjjVrpntkFjCq3vgULtmNA8lEYCiB87Y2kISATj2wBFbqyWR+RsZN6cT4aGisNEmnvuKPOMuAXisKOxOE8+AIs+kSwAKisJykQpTi2fKJQDPlURdAj0RrkslLtNAWeONkihzskSh1ViZLtIaq0qi9mO4ykpcKy4B2FQSVYrh+qLEZe4TrLGtJOpTDNeaEteWSwB2lUS9i+FaUuL65hKAAyVRL2K45hRbY2scKYl6GsP1TInL3DFao5picaJVdFVcAnBqQXglZ3pZMvs6sAy8BKbF0cEYrkH527RshyVJjCU5Nk9k7Xb1/HEJwEUbjc1dKWm10Stcoy1qMz5Y47pFkk6h1SfSGtfdHoCLbt8Cpw5JcF8S2JoktLkbkuCAj0mwakHYihlHM3EMHimJMkVPJgqhAyVR5hHPRCn8XUmU2d9RLPvYDG0riTLJLYp1H9vhTSVRpkSOouTjhchHJVGmT0gr37x3CcCCkihzpkfxW4nrlUsAZpVEXUWuxXssixzbI7dlTCmJakTK5j5FnicuAZhUFGZK3zS+GjMTZdYYVxRmvhD9jweKPGaczhp5RWFpWb6bBySqJICiB450dERmuNuHpJCRs0bGzDy5iSGn2Blq2A+N67l8RqZFzT/qNkrIyXbwMSfU5bG/RQoYkumRmgeO1yTb36NDyEu1NSG9wwzwGvgAfAZ25IcPZbmfq8iPI86anDiT1yrynrJ8ZkfWWJE1Z4RjQjgTnwoPCAgICAige/APXNsNOTMuQXQAAAAASUVORK5CYII=";
const zoomout="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAACXBIWXMAAAsTAAALEwEAmpwYAAACr0lEQVR4nO2bQUtUURTHfx+gKXDb8yOkQVttIe5ciFn0DSznC1SLtKW1LI0p/ABZwnyAQNwUiBJKhYLEuBjeGGQoCC1ymLhwgkGC3rxznXse7/7hv3nz3rn3d+a9++69cwaioqKioqKiFBoERoBbQBWYBxaBVWAN2BLvA9+AFPgJnAAd8YkcS+Wc/a7r1iTWosSuSlsj0nYQXQdqwPcuiFA+lL4M9wP8MrAMtA2An7fr02ugclHwg8BnA6D/8w6Q+IavSOBOQfwVuOIzAcsGoHq1exy8DXhtA0C92vV5yEcCagZg8nrJRwIODYDkdcvHyN8puFVvhJsGALQe1STgtgEArac1CagaANB6VpOAJwYAtHYLqNx6aQBAa7eKzK1VAwBar2gSsG4AQGu3n5BbGwYAtP6oScCOAQCtP2kSsGcAwMfSOLcaBgC0dnuMuZUaANC6qUnAUQ8N/ZI75gNQB14BC8ADYAa4A0wA48AYcOOcx+SzCTl3Rq5dkFh1id2QtrL264cmAacZGxmg/xrI2DfHkFtnGRsJpSx9+61p4KzsCTgt+yNw1OMgeCAzr7rsyj4FHgL3gbvApAx04/8YBP8en5Rz3TWPgGcSqy6xD/o5CKYeXkOFfg02DAAEnQjtGQAIOhXeNgAQdDG0YQAg6HJ43QBA0A2RdwYAtH6jScCSAQCtn2sSMG8AQOvHmgTMGgDQ+p4mAdMGALR2FWW5NWoAQGtXTpdbiQEArZMyF0ikeFDNAEjQEpnhshdJIRsSnYLZ3bleCyW3DUBl9Rcp6/WqpCC/Fbov6ioXpIo8DhbHhLbc9pfog4akeqRlALwlo/01AimR2daUrB3mgBfAW+A9sCl/fNiV/bmm/DniuAviWI415ZxduWZTYqxIzDlpY0ra9F4VHhUVFRUVRXn0B6LYbr15YpQwAAAAAElFTkSuQmCC";

function LiveView() {
  const dispatch = useDispatch();
  const location = useLocation();
  const { id } = useParams();
  const [row, setRow] = useState(); 
  const full = useParams();
  const [view, setView] = useState("camera");
  const [camera, setCamera] = useState({ cam: "", link: "", id: 0,eventId:"" });
  const date = new Date().toLocaleDateString();
  const [tilt, setTilt] = useState(0);
  const [pan, setPan] = useState(0);
  const [zoom, setZoom] = useState(0);
  const [colour, setColor] = useState("white");
  const [eventItem, setEventItem] = useState({ exist: 0, item: "" });
  const [live, setLive] = useState(false);
  const [success, setSuccess] = useState(false);
  
 const [imageUrls, setImageUrls] = useState([]);
  const organization = useSelector(selectOrganization);
  useEffect(() => {
    dispatch(getOrganization());
  }, []);

  const [eventComponent, setEventComponent] = useState(null);

  useEffect(() => {
    
    if (eventComponent === "CVGL") {
      setEventComponent(<LiveEvents />);
    }
    if(id===3){
      setLive(true)
    }
  }, [eventComponent]);

  var timer = "";

  const [towers, setTowers] = useState(null);

  const { side_nav: side_nav_check } = useSelector(selectSiteData);
  let side_nav = side_nav_check ? <SideNav /> : null;

  const views = {
    camera: "camera component",
    map: "map component", //<MapContainer />
    video: <VideoComponent row={row} />,
  };

  const Header = {};
  Header['Authorization'] = `Token ${localStorage.getItem("token")}`;
  let config = {
    headers: Header,
  };

  useEffect(() => {
    var sid = id.split(" ");
    fetch(`${backend_url}/core/api/towers/`, config)
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            `This is an HTTP error: The status is ${response.status}`
          );
        }
        return response.json();
      })
      .then((actualData) => {
        setTowers(actualData.results);
        var temp_id = Number(id);
        console.log(actualData.results);
        if (sid[0] === "event") setCamera({ cam: "Select a Camera", link: sid[2].replaceAll('(','/'), id: camera.id,eventId:"" });
        else {
          const foundObject = actualData.results.find((obj) => obj.id === temp_id);
          setCamera({ cam: foundObject["name"], link: "", id: foundObject["id"] });
          // setCenter({center:{lat:actualData.results[temp_id]["lat"], lng:actualData.results[temp_id]["lat"]}, zoom: 12, isZoom:false})
        }
      })
      .catch((err) => {
        setTowers(null);
      });
  }, []);

  const eventClick = (item) => {
    // let x=item.camera==1?'Hawa Gali':item.camera==2?'Panja Gali':'Palm Gali';
    console.log("inside events", item);
    let x = item.camera_name;

    setCamera({ cam: x, link: item.file, id: item.id ,eventId:item.uuid});
if(item.uuid!==""){
  setImageUrls([ ])
  loadGifFrames(item.uuid);
}
  };

  const loadGifFrames = async (uuid, url = null) => {
    try {
      const gifUrl = url || `${backend_url}/core/api/image/?event=${uuid}`;
      console.log("gifUrl:", gifUrl);
      const response = await fetch(gifUrl, config);
  
      if (!response.ok) {
        throw new Error(`Failed to fetch GIF frames. Status: ${response.status}`);
      }
  
      const data = await response.json();
      var result = data.results;
      console.log("data:", result);
      
      const imageUrls = result.map(item => { const updatedUrl = item.file.includes('http://127.0.0.1:8000')
      ? item.file.replace('http://127.0.0.1:8000', 'https://api.forestwatch.org.pk')
      : item.file;
      console.log("date of image:",item.date)
    return updatedUrl}
);
      setImageUrls(prevImageUrls => [...prevImageUrls, ...imageUrls]);
  
      if (data.next !== null) {
        // If there are more pages, recursively call loadGifFrames with the next page URL
        await loadGifFrames(uuid, data.next);
      }
    } catch (error) {
      console.error('Error loading GIF frames:', error);
    }
  };
  
  let HandleSubmit = async (e) => {
  //  e.preventDefault();
    try {
      // let nam = camera.cam.split(" ")[0]
      let nam = "PTZ-" + camera.cam.replace(" ", "-");
      console.log("nam is", nam);
      let res = await fetch(`${backend_url}/core/api/camera/ptzControls/`, {
        method: "POST",
        body: JSON.stringify({
          pan: pan,
          tilt: tilt,
          zoom: zoom,
          camera: nam,
        }),
        headers: {
          'Content-type': 'application/json;',
          'Authorization': `Token ${localStorage.getItem("token")}`,
        },
      });
      let resJson = await res.json();
      if (res.status === 200) {
        setSuccess(true);
       
      } else {
        console.log(resJson.error);
      }
    } catch (err) {
      console.log(err);
    }
  };
const handleRefresh=()=>{ 
  setPan(0);
  setTilt(0); 
  setZoom(0);
}
const changeLive=(liv)=>{
  setLive(liv);
}
  return (
    <div className="page">
      <div className="page__content">
        <div className="main-wrapper">
          {side_nav}
          <div className='row navbar bg-dark'>
          
            <div className='col-md-4'>
              <div className='row mx-0 px-0'>
              
                <div className='col-md-4 lead text-light'>Tower Panel</div>
                <div className='col-md-8'>
                  <Dropdown>
                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                      {camera.cam}
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      {towers && towers.map((item, index) => (
                        <Dropdown.Item
                          key={item.id}
                          href={`/live/${item.id}`}
                          onClick={() => {
                            setCamera({ cam: item.name, link: "", id: item.id });
                          }}
                        >
                          {item.name}
                        </Dropdown.Item>
                      ))}
                    </Dropdown.Menu>
                  </Dropdown>
                </div>
              </div>
            </div>
            <div className='col-md-8'>
              <ul className="nav nav-tabs" defaultActiveKey="/home">
                <li className="nav-item">
                  <a
                    className={colour === "white" ? "nav-link active" : "nav-link"}
                    style={{ textDecoration: "none", color: colour === 'white' ? 'black' : 'white' }}
                    onClick={() => { setView("camera"); setColor("white") }}
                  >
                    Camera
                  </a>
                </li>
                <li>
                  <a
                    className={colour !== "white" ? "nav-link active" : "nav-link"}
                    style={{ color: colour }}
                    onClick={() => { setView("map"); setColor("black") }}
                    eventKey="link-1"
                  >
                    Map
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className='row' style={{ height: "50%" }}>
            <div className='col-md-4 d-flex justify-content-center'>
              <div className=' row mx-2 px-2 d-flex justify-content-center' style={{ backgroundColor: "white" }}>
               
                  <div className="row d-flex justify-content-center">
                    <p className='lead'>PTZ Controls</p>
                    <label className="form-label" htmlFor="customRange1" style={{width:'30%'}}>Pan <span className='lead' style={{ float: 'right' }}>{pan}</span></label>
                    <div className="row range w-50">
                      <input type="range" className="form-range" id="customRange1" value={pan} onChange={(e) => setPan(e.target.value)} min="0" max="360" step="1" />
                    </div>
                    <label className="form-label" htmlFor="customRange1" style={{width:'30%'}}>Zoom <span className='lead' style={{ float: 'right' }}>{zoom}</span></label>
                    <div className="row range w-50">
                      <input type="range" className="form-range" id="customRang32" value={zoom} onChange={(e) => setZoom(e.target.value)} min="0" max="100" step="1" />
                    </div>
                    <label className="form-label" htmlFor="customRange1"style={{width:'30%'}}>Tilt <span className='lead' style={{ float: 'right' }}>{tilt}</span></label>
                    <div className="row range w-50">
                      <input type="range" className="form-range" id="customRange3" value={tilt} onChange={(e) => setTilt(e.target.value)} min="0" max="90" step="1" />
                    </div>
                     
                   {live?(<>
                     <div style={{    display: 'flex', alignItems: 'center',flexDirection: 'column'}}>
                     <div><Tooltip title="Tilt" placement='top'>
                       <button style={{border: 'none',background: 'white'}} onClick={()=>{if(tilt!==90){setTilt(tilt+5)}}}>
                        <img src={up} style={{width:'48px',height:'48px'}}/>
                       </button></Tooltip>
                     </div>
                     <div>
                     <Tooltip title="Zoom Out">
                     <button  style={{border: 'none',background: 'white'}} onClick={()=>{if(zoom!==0){setZoom(zoom-10)}}}>
                         <img src={zoomout} style={{width:'48px',height:'48px'}}/>
                       </button></Tooltip>
                       <Tooltip title="Pan">
                       <button  style={{border: 'none',background:'white'}} onClick={()=>{if(pan!==0){setPan(pan-10)}}}>
                         <img src={left} style={{width:'48px',height:'48px'}}/>
                       </button></Tooltip>
                       <Tooltip title="reset">
                     <button  style={{background: 'white',borderRadius:'80px',border:'2px solid black',backgroundColor:'white'}} onClick={()=>{ handleRefresh() }}>
                       <img src={refresh} style={{width:'30px',height:'30px'}}/>
                     </button></Tooltip>
                    <Tooltip title="Pan">
                     <button  style={{border: 'none',background: 'white'}} onClick={()=>{if(pan!==360){setPan(pan+10)}}}>
                       <img src={right} style={{width:'48px',height:'48px'}}/>
                     </button></Tooltip>
                     <Tooltip title="Zoom In">
                     <button  style={{border: 'none',background: 'white'}} onClick={()=>{if(zoom!==100){setZoom(zoom+10)}}}>
                         <img src={zoomIn} style={{width:'48px',height:'48px'}}/>
                       </button></Tooltip>
                     </div>
                     <div> <Tooltip title="Tilt">
                       <button style={{border: 'none',background: 'white'}}  onClick={()=>{if(tilt!==0){setTilt(tilt-5)}}}>
                       <img src={down} style={{width:'48px',height:'48px'}}/>
                       </button></Tooltip>
                       </div> </div>
                   <br/>
                    <div style={{display:'flex',justifyContent:'center'}}>
                    <button onClick={HandleSubmit} className="btn btn-primary" type="submit" style={{color:'white',background:'black',border:'1px solid black'}}>Confirm</button>
                   </div>
                   </>):(<>
                    <div style={{    display: 'flex', alignItems: 'center',flexDirection: 'column'}}>
                      <div><Tooltip title="Tilt" placement='top'>
                        <button style={{border: 'none',background: 'white'}} onClick={()=>{if(tilt!==90){setTilt(tilt+5);HandleSubmit();}}}>
                         <img src={up} style={{width:'48px',height:'48px'}}/>
                        </button></Tooltip>
                      </div>
                      <div>
                      <Tooltip title="Zoom Out">
                      <button  style={{border: 'none',background: 'white'}} onClick={()=>{if(zoom!==0){setZoom(zoom-10);HandleSubmit();}}}>
                          <img src={zoomout} style={{width:'48px',height:'48px'}}/>
                        </button></Tooltip>
                        <Tooltip title="Pan">
                        <button  style={{border: 'none',background:'white'}} onClick={()=>{if(pan!==0){setPan(pan-10);HandleSubmit();}}}>
                          <img src={left} style={{width:'48px',height:'48px'}}/>
                        </button></Tooltip>
                        <Tooltip title="reset">
                      <button  style={{background: 'white',borderRadius:'80px',border:'2px solid black',backgroundColor:'white'}} onClick={()=>{ handleRefresh() }}>
                        <img src={refresh} style={{width:'30px',height:'30px'}}/>
                      </button></Tooltip>
                     <Tooltip title="Pan">
                      <button  style={{border: 'none',background: 'white'}} onClick={()=>{if(pan!==360){setPan(pan+10);HandleSubmit();}}}>
                        <img src={right} style={{width:'48px',height:'48px'}}/>
                      </button></Tooltip>
                      <Tooltip title="Zoom In">
                      <button  style={{border: 'none',background: 'white'}} onClick={()=>{if(zoom!==100){setZoom(zoom+10);HandleSubmit();}}}>
                          <img src={zoomIn} style={{width:'48px',height:'48px'}}/>
                        </button></Tooltip>
                      </div>
                      <div> <Tooltip title="Tilt">
                        <button style={{border: 'none',background: 'white'}}  onClick={()=>{if(tilt!==0){setTilt(tilt-5);HandleSubmit();}}}>
                        <img src={down} style={{width:'48px',height:'48px'}}/>
                        </button></Tooltip>
                        </div> </div>
                    <br/>
                    </>)}
                    
                  </div>
                
              </div>
            </div>
            <div className='col-md-8' style={{ backgroundColor: '#eeee',    paddingBottom: "20px"}}>
              <div className='mb-3 d-flex justify-content-center' style={{height:'50%',width:"100%"}}>
                {view === "camera" ? <CameraFeed cameraId={camera} view={view} live={live} changeLive={changeLive} imageUrls={imageUrls} /> :
                  <MiniMap camId={id} />
                }
              </div>
            </div>
          </div>
          <div className='row'>
            <div className='col-md-4 px-4 py-2 d-flex justify-content-center' style={{ backgroundColor: '#fffff' }}>
              {view === "map" ? <CameraFeed cameraId={camera} view={view} live={live}  /> :
                <MiniMap camId={id}/>
              }
            </div>
            <div className='col-md-8 pe-0 me-0' style={{   paddingRight:"10px", backgroundColor: "rgba(238, 238, 238, 0.933)"}}>
             <LiveFilter/>
             {organization.name === "CVGL" ?<LiveEvents eventClick={eventClick} cam_id={id} setRow={setRow} setView={setView} />:''}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const VideoComponent = ({ row }) => {
  return (
    <div>
      <img src={row.event} alt="" />
    </div>
  );
};

export default withRouter(LiveView);
