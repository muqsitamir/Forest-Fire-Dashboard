//import './Login.css'
import {useState, useEffect, Redirect} from 'react';
import { useHistory ,Link} from "react-router-dom";
import axios from "axios";
import { backend_url } from '../App';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
export default function ChangePassword() {

  let history = useHistory();
  const [password, setPassword] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [message, setMessage] = useState("");
  const user = JSON.parse(localStorage['user']);
    console.log("organization: " + user.organization);
    var  name = user.username;
  const [isOldPasswordHidden, setIsOldPasswordHidden] = useState(true);
  const [isNewPasswordHidden, setIsNewPasswordHidden] = useState(true);
 

  //useEffect(() => {
   //   setAuthh(current=>current+authh)
  //}, [authh])
  let HandleSubmit = async (e) => {
    e.preventDefault();
    
    const Header = { Authorization: `Token ${localStorage.getItem("token")}`, 'Content-Type': 'application/json' };
    const config = { headers: Header };
    
    const url = `${backend_url}/accounts/api/password/change/`;
    const body = {
        username: name,
        old_password: oldPassword,
        new_password: password
    };
    
    try {
        const response = await axios.post(url, body, config);
        if (response.status === 200) {
            setPassword("");
            setOldPassword("");
            setMessage("Password changed successfully");
        } else {
            setMessage("Network error");
        }
    } catch (err) {
        setMessage(err.response?.data?.non_field_errors[0] || "Network error");
    }
};


  return (
    <>
    <div className="py-3 back"></div>
<div className="py-5 back vh-100">
    <div className="card d-flex justify-content-center my-0" style={{width: "25rem"}}>
        <div className="card-body mx-2">
        <div className="mb4 mt3 d-flex er " style={{flexDirection:'column',alignItems:'center'}}>
                            <img className="w-20 h-20" src={require("../images/firelogo.jpeg")} alt="" style={{width:'100%', marginBottom: '10px'}}/>
                            
                            <h4>Change Password</h4>
                            </div>
                
            <form onSubmit={HandleSubmit}>
                
            <div className="form-outline mb-3" style={{ position: "relative" }}>
                  <label className="form-label" htmlFor="oldPassword">Old Password</label>
                  <input 
                    type={isOldPasswordHidden ? "password" : "text"} 
                    id="oldPassword" 
                    name="oldPassword" 
                    className="form-control" 
                    value={oldPassword} 
                    onChange={(e) => setOldPassword(e.target.value)}
                    placeholder="Enter old password" 
                  />
                  <span 
                    className="input-group-text" 
                    onClick={() => setIsOldPasswordHidden(!isOldPasswordHidden)}
                    style={{ position: "absolute", right: "10px", top: "72%", transform: "translateY(-50%)", cursor: "pointer" }}
                  >
                    {isOldPasswordHidden ? <FaEyeSlash /> : <FaEye />}
                  </span>
                </div>
                <div className="form-outline mb-3" style={{ position: "relative" }}>
                  <label className="form-label" htmlFor="newPassword">New Password</label>
                  <input 
                    type={isNewPasswordHidden ? "password" : "text"} 
                    id="newPassword" 
                    name="newPassword" 
                    className="form-control" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter new password" 
                  />
                  <span 
                    className="input-group-text" 
                    onClick={() => setIsNewPasswordHidden(!isNewPasswordHidden)}
                    style={{ position: "absolute", right: "10px", top: "72%", transform: "translateY(-50%)", cursor: "pointer" }}
                  >
                    {isNewPasswordHidden ? <FaEyeSlash /> : <FaEye />}
                  </span>
                </div>
                {message ? <div className="message alert alert-info">{message ? <p>{message}</p> : null}</div>: <div></div>}
                
                <div className="mv2 pt3">
                                        <button className="btn btn-xl btn-primary btn-block text-white btn-shadow"
                                                 onClick={HandleSubmit}>Change Password
                                        </button>
                                    </div>

            </form>
            <div className="mv3 ">
                            <div className="flex items-center justify-center">
                                ©
                                <span className="mr2" style={{fontSize: '.875rem'}}>2021</span>
                                <span className="dot"/>
                                <Link className="di mh2 fw4" style={{fontSize: '.875rem', color: '#576c77'}}
                                      title="Terms of Service"
                                      to="#" target="_blank">Terms of Service</Link>
                                <span className="dot"/>
                                <Link className="di mh2 fw4" style={{fontSize: '.875rem', color: '#576c77'}}
                                      title="Terms of Service"
                                      to="#" target="_blank">Privacy Policy</Link>
                            </div>
                        </div>
        </div>
    </div>
</div>
    </>
  );
}

