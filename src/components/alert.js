import './alert.css'
import React, { useEffect, useState } from "react";
export default function Alert(props) {
    const [isShowingAlert, setShowingAlert] =  useState(false);
    
    return (
        <div>
          <div
            className={`alert alert-success ${isShowingAlert ? 'alert-shown' : 'alert-hidden'}`}
            onTransitionEnd={() => setShowingAlert(false)}
          >
            <strong>Success!</strong> Thank you for subscribing!
          </div>
          <button onClick={() => setShowingAlert(true)}>
            Show alert
          </button>
          (and other children)
        </div>
      );
  }