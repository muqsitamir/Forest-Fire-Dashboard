import React from "react";

const Modal = ({ show, handleClose, handleLogout, handleChangePassword }) => {
    const showHideClassName = show ? "modal display-block" : "modal display-none";

    return (
        <div className={showHideClassName}>
            <section className="modal-main">
                <button onClick={handleLogout}>Logout</button>
                <button onClick={handleChangePassword}>Change Password</button>
                <button onClick={handleClose}>Close</button>
            </section>
        </div>
    );
};

export default Modal;
