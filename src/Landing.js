import React from 'react';
import { Link } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.min.css';

import './LandingPage.css';  // Make sure to create this CSS file for styles

const Landing = () => {
    
    const handle_home_click = () => {
        window.location = '/login';
    };
    return (
        <div className="landing-page">
            <header style={{ background: 'white' }} className="mdc-top-app-bar mdc-top-app-bar--shadow__ mdc-top-app-bar--fixed js-top-app-bar"
                data-mdc-auto-init="MDCTopAppBar">
            <div className="mdc-top-app-bar__row contain-full-bleed links--muted ">
                <section className="mdc-top-app-bar__section mdc-top-app-bar__section--align-start">
                    <Link to="/" className="mdc-top-app-bar__title">
                        <img width='200' src={require("./images/firelogo.jpeg")} alt="Project Logo"/>
                    </Link>
                </section>
                <section className="mdc-top-app-bar__section app-shop mdc-top-app-bar__section--align-end mr4"
                         role="toolbar">
                    <button className="mdc-button mdc-theme--primary mdc-top-app-bar__action-item" onClick={handle_home_click}>
                        <span className="mdc-button__ripple"/>
                        <span className="mdc-button__label">Login</span>
                    </button>
                    
                    
                   
                </section>
            </div>
        </header>
            <section className="hero">
                <img src={require("./images/map.png")} alt="Map" className="hero-image" />
                <div className="hero-text">
                    <h1>Forest Watch</h1>
                    <p>This platform is a result of a collaboration between WWF Pakistan and Lahore University of Management Sciences (LUMS). 
        Together, we aim to provide innovative solutions for environmental and wildlife conservation through advanced technological research and development.
    </p>
                </div>
            </section>
            
            <section className="collaborators">
                <div className="collaborator-card">
                     <div className="collaborator-info">
                     <img src={require("./images/wwf_logo.png")} alt="WWF Logo" className="collaborator-logo" style={{width:'17%'}} />
                     <p>WWF Pakistan is dedicated to conserving nature and reducing the most pressing threats to the diversity of life on Earth.</p>
                     <div className="social-media-handles">
        <a href="https://www.facebook.com/WWFPak/" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-facebook-f"></i>
        </a>
        <a href="https://twitter.com/WWFPak" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-twitter"></i>
        </a>
        <a href="https://www.instagram.com/wwfpakistan/" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-instagram"></i>
        </a>
        <a href="https://www.linkedin.com/company/wwf-pakistan/" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-linkedin-in"></i>
        </a>
    </div>
                    </div>
                   
                </div>
                <div className="collaborator-card">
                   <div className="collaborator-info">
                   <img src={require("./images/LUMS.png")} alt="LUMS Logo" className="collaborator-logo" style={{width:'30%'}} />
                    <p style={{marginTop:'30px'}} >Lahore University of Management Sciences (LUMS) is a world-class academic institution with a proud history of achievement and ambitious plans for the future.</p>
                    <div className="social-media-handles">
        <a href="https://www.facebook.com/lahoreuniversityofmanagementsciences" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-facebook-f"></i>
        </a>
        <a href="https://twitter.com/lifeatlums" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-twitter"></i>
        </a>
        <a href="https://www.instagram.com/lifeatlums/" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-instagram"></i>
        </a>
        <a href="https://pk.linkedin.com/school/lahore-university-of-management-sciences/" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-linkedin-in"></i>
        </a>
    </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Landing;
