import React, {useState} from "react";
import { Link } from "react-router-dom";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import './style.css'
import punjabAdminLogo from '../../images/forest_fire_new_logo.jpeg';
import fireLogo from '../../images/firelogo.jpeg';

export default function TopAppBar() {
    const user = JSON.parse(localStorage['user']);
    const organization = user.organization;
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const logo = user.username === "punjabadmin" ? punjabAdminLogo : fireLogo;
    const logoSize = user.username === "punjabadmin" ? "220" : "150";

    const handle_camera_click = () => {
        window.location = '/cameras';
    };

    const handle_admin_click = () => {
        window.location = 'https://api.forestwatch.org.pk/admin';
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
                        <img width={logoSize} src={logo} alt="Project Logo"/>
                    </Link>
                </section>
                <section
                 className="mdc-top-app-bar__section app-shop mdc-top-app-bar__section--align-end mr4"
                 role="toolbar"
                 style={{ position: 'relative' }}
                >
                    <Link to="/" className="show-lg link-mute">
                        <button className="mdc-button mdc-theme--primary mdc-top-app-bar__action-item" >
                            <span className="mdc-button__ripple"/>
                            <span className="mdc-button__label">Home</span>
                        </button>
                    </Link>
                    <Link to="/dashboard" className="show-lg link-mute">
                    <button className="mdc-button mdc-theme--primary mdc-top-app-bar__action-item" >
                        <span className="mdc-button__ripple"/>
                        <span className="mdc-button__label">Dashboard</span>
                    </button>
                    </Link>
                        <button className="mdc-button mdc-theme--primary mdc-top-app-bar__action-item" onClick={handle_camera_click}>
                            <span className="mdc-button__ripple"/>
                            <span className="mdc-button__label">Cameras</span>
                        </button>

                    <button className="mdc-button mdc-theme--primary mdc-top-app-bar__action-item profile-button" onClick={toggleDropdown}>
                        <AccountCircleIcon style={{ fontSize: 40 }} />
                    </button>

                    {dropdownOpen ? (
                        <div className="dropdown-menu1" >
                            <span style={{color:'black',fontWeight:'700',textAlign:'center'}}>{user.username}</span>
                            <br/>
                            {organization === "CVGL" && (
                             <button  onClick={handle_admin_click}>Admin</button>
                            )}
                            <button onClick={handleLogout}>Log out</button>
                        </div>
                    ) : (<></>)}
                    <button
                        className="menu-mobile material-icons mdc-theme--primary mdc-top-app-bar__navigation-icon mdc-icon-button dn-l js-trigger-mdc-drawer"
                        aria-label="Open navigation menu">menu
                    </button>
                </section>
            </div>
        </header>
    );
}
