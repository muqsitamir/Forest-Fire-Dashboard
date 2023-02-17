import './Login.css'
import {useState, useEffect, Redirect} from 'react';
import { useNavigate } from "react-router-dom";

export default function Login() {

  let history = useNavigate();
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  let authh=""

  //useEffect(() => {
   //   setAuthh(current=>current+authh)
  //}, [authh])

  let HandleSubmit = async (e) => {
    e.preventDefault();
    try {
      let res = await fetch("https://forest-fire-dashboard.vercel.app/api/login", {
        method: "POST",
        body: JSON.stringify({
          username: name,
          password: password,
        }),
        headers: {
            'Content-type': 'application/json;',
          },
      });

      let resJson = await res.json();
      if (res.status === 200) {
            setName("");
            setPassword("");
            setMessage("Logged in successfully");
            history('/map');
      } else {
        setMessage(resJson.error);
      }
    } catch (err) {
      console.log(err);
      setMessage(err);
      
    }
  };

  return (
    <>
    <div className="py-3 back"></div>
<div className="py-5 back vh-100">
    <div className="card d-flex justify-content-center my-0" style={{width: "20rem"}}>
        <div className="card-body mx-2">
            <div className="d-flex justify-content-center my-2 row">
                <div className="col-md-6 mx-0"><img className="w-100" src='https://tpi.lums.edu.pk/wp-content/uploads/tpi-logo.png'></img>
                </div>
                <div className="col-md-6 mx-0">
                <img className="mycontent-left d-flex justify content-end w-100 px-2" src='https://lums.edu.pk/sites/default/files/inline-images/LUMS%20Logo.png'></img>
                </div>
            </div>
                
            <form onSubmit={HandleSubmit}>
                <div className="form-outline mb-4" >
                    <label className="form-label" htmlFor="form3Example3">Username</label>
                    <input type="text" id="form3Example3" name="username" value={name} onChange={(e) => setName(e.target.value)} className="form-control"
                        placeholder="Username" />
                    
                </div>
                <div className="form-outline mb-3" >
                    <label className="form-label" htmlFor="form3Example4">Password</label>
                    <input type="password" id="form3Example4" name="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter password" />
                    
                </div>
                {message ? <div className="message alert alert-info">{message ? <p>{message}</p> : null}</div>: <div></div>}
                
                <div className="text-center text-lg-start mt-4 pt-0">
                    <div className="d-grid gap-2 col-6 mx-auto">
                        <button className="btn btn-primary" type="submit">Login</button>
                        </div>
                    <p className="mt-2 pt-1 mb-0 text-center"> <a href="https://forest-fire-dashboard.vercel.app/admin/" target="adminname"
                            >Admin Dashbord</a></p>
                </div>

            </form>
        </div>
    </div>
</div>
    </>
  );
}

