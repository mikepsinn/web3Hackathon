import React from 'react';
import './ErrorMessage.css'

export default function ErrorMessage(props) {
    return (
        <span className={"error"}>{props.error}</span>
    )
}