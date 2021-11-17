import React from "react";




export default function HeaderImage() {

    return (
        <img
            src={process.env.PUBLIC_URL + '/navbarImage.png'}
            alt='doctor healthcare image'
            style={{ width: '100vw' }} />
    )
}