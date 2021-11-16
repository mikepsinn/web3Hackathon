import React from 'react';
import './SuccessMessage.css'

export default function SuccessMessage(props) {
    return (
        <span style={{ color: 'green' }} className={"error"}>{props.success}</span>
    )
}