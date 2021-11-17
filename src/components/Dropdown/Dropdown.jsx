import React, { useState } from 'react'
import { Link } from 'react-router-dom'
// import './Navbar.css'
import onClickOutside from "react-onclickoutside";

function Dropdown({ setShow, handleLogout }) {
    Dropdown.handleClickOutside = () => setShow(false);

    function closeDropdown() {
        setShow(false)
    }



    return (
        <div id='dropdown'>
            <Link id='addClientButton' className='dropdownItem' to='/addclient' onClick={closeDropdown}>Add Client</Link>
            <Link id='addClientButton' className='dropdownItem' to='/addtrial' onClick={closeDropdown}>Add Trial</Link>
            <Link id='addClientButton' className='dropdownItem' to='/find' onClick={closeDropdown}>Find</Link>

            <Link id='logoutButton' className='dropdownItem' to='/index' onClick={handleLogout}>Logout</Link>
        </div>

    )
}
const clickOutsideConfig = {
    handleClickOutside: () => Dropdown.handleClickOutside
}
export default onClickOutside(Dropdown, clickOutsideConfig)