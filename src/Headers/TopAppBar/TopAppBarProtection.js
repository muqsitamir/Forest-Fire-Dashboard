import React from 'react';


export default function TopAppBarProtection({Component}) {
    let check = localStorage.getItem('token') ? true : false;
    let check2 = !window.location.pathname.includes('/live/')
    return (
        check && check2 ? < Component /> : null
    );
}