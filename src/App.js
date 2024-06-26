import React from 'react';
import {Redirect, Route, Switch} from "react-router-dom"
// import Register from "../components/Authentication/register";
// import NewPassword from "../components/Authentication/newPassword";
// import ResendPassword from "../components/Authentication/resendPassword";
import MessageSnackbar from "./reusable_components/SnackBar";
import ResetPassword from "./Authentication/ResetPassword";
import Home from "./pages/Home";
import ProtectedRoute from "./Authentication/ProtectedRoute";
import Login from './Authentication/Login'
import Logout from "./Authentication/Logout";
import TopAppBarProtection from "./Headers/TopAppBar/TopAppBarProtection";
import TopAppBar from "./Headers/TopAppBar/TopAppBar";
import NotFound from "./reusable_components/NotFound";
import ReactSpinner from "./reusable_components/ReactSpinner";
import Cameras from "./pages/Cameras";
import OnlyPublicRoute from "./Authentication/OnlyPublicRoute";
import GoogleMap from "./components/GoogleMap";
import LiveView from "./components/LiveView";
import Nasa from './features/events/Nasa';
import CameraDetailsPage from './pages/CameraDetailsPage';
//export const backend_url = 'http://127.0.0.1:8000';
export const backend_url = 'https://api.forestwatch.org.pk';
export const googleMapsApiKey='AIzaSyBup6K7zk3Hp7u53HmAVCMwqeEfFCEf70Q';

export default function App () {
        return (
            <React.Fragment>
                <TopAppBarProtection Component={TopAppBar} />
                <ReactSpinner/>
                <Switch>
                <ProtectedRoute exact path='/' Component={GoogleMap} />
                <ProtectedRoute exact path="/dashboard" Component={Home} />
                <ProtectedRoute exact path='/cameras' Component={Cameras} />
                <ProtectedRoute exact path='/nasa' Component={Nasa} />
                <ProtectedRoute exact path='/live/:id' Component={LiveView} />
                <ProtectedRoute exact path='/statistics/:id' Component={CameraDetailsPage} />
                <OnlyPublicRoute exact path='/login' Component={Login} />
                <Route exact path='/logout' render={(props) => <Logout {...props}/>}/>
                <Route path='/reset-password' render={(props) => <ResetPassword {...props}/>}/>
                {/*    <Route exact path='/register' render={(props) => <Register {...props}/>}/>*/}
                {/*    <Route path='/new-password/:token' render={(props) => <NewPassword {...props}/>}/>*/}
                {/*    <Route exact path='/resend/new-password' render={(props) => <ResendPassword {...props}/>}/>*/}
                <Route path='/not-found' Component={NotFound}/>
                <Redirect to='/not-found'/>
                </Switch>
                <MessageSnackbar/>
            </React.Fragment>
        );
}

