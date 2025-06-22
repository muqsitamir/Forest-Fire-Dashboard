import React, { useState } from "react";
import { Link } from "react-router-dom";
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { showSideNav } from '../../reusable_components/site_data/siteDataSlice';
import { useDispatch } from "react-redux";
import './style.css'
export default function TopAppBar() {
    const user = JSON.parse(localStorage['user']);
    console.log("organization: " + user.organization);
    const organization = user.organization;
    const dispatch = useDispatch();
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const handle_side_nav = () => {
        dispatch(showSideNav());
    };

    const handle_camera_click = () => {
        window.location = '/cameras';
    };

    const handle_admin_click = () => {
        window.location = 'https://api.forestwatch.org.pk/admin';
    };

    const handle_dashboard_click = () => {
        window.location = '/dashboard';
    };

    const handle_home_click = () => {
        window.location = '/home';
    };

    const handleLogout = () => {
        window.location = '/logout';
    };
 

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    return (
        <header style={{ background: 'white' }} className="mdc-top-app-bar mdc-top-app-bar--shadow__ mdc-top-app-bar--fixed js-top-app-bar"
                data-mdc-auto-init="MDCTopAppBar">
            <div className="mdc-top-app-bar__row contain-full-bleed links--muted ">
                <section className="mdc-top-app-bar__section mdc-top-app-bar__section--align-start">
                    <Link to="/" className="mdc-top-app-bar__title">
                        <img width='200' src={require("../../images/firelogo.jpeg")} alt="Project Logo"/>
                    </Link>
                </section>
                <section className="mdc-top-app-bar__section app-shop mdc-top-app-bar__section--align-end mr4"
                         role="toolbar">
                    <button className="mdc-button mdc-theme--primary mdc-top-app-bar__action-item" onClick={handle_home_click}>
                        <span className="mdc-button__ripple"/>
                        <span className="mdc-button__label">Home</span>
                    </button>
                    <button className="mdc-button mdc-theme--primary mdc-top-app-bar__action-item" onClick={handle_dashboard_click}>
                        <span className="mdc-button__ripple"/>
                        <span className="mdc-button__label">Dashboard</span>
                    </button>
                    <button className="mdc-button mdc-theme--primary mdc-top-app-bar__action-item" onClick={handle_camera_click}>
                        <span className="mdc-button__ripple"/>
                        <span className="mdc-button__label">Cameras</span>
                    </button>
                    
                    
                    <button className="mdc-button mdc-theme--primary mdc-top-app-bar__action-item profile-button" onClick={toggleDropdown}>
                        <AccountCircleIcon style={{ fontSize: 40 }} /> {/* Use the icon */}
                    </button>
                    
                    {dropdownOpen && (
                        <div className="dropdown-menu1" style={{display:'flex !important'}}>
                            {organization === "CVGL" && (
                             <button  onClick={handle_admin_click}>Admin</button>
                            )}
                            <button onClick={handleLogout}>Log out</button>
                        </div>
                    )}
                </section>
            </div>
        </header>
    );
}
