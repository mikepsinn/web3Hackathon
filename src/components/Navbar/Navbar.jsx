import React, { useState, useRef, useEffect } from 'react'
import { Icon } from 'semantic-ui-react'
import { Link, useLocation } from 'react-router-dom'
import './Navbar.css'
import Dropdown from './Dropdown/Dropdown'
import HeaderImage from '../MOLECULES/HeaderImage'
import WelcomeHeader from '../MOLECULES/WelcomeHeader'
import Wallet from '../Wallet/Wallet.jsx'

export default function Navbar({ wallet, user, handleLogout, setShow, show, connect }) {
    const location = useLocation()
    const [hover, setHover] = useState(false)
    // Navbar.handleClickOutside = () => setShow(false);



    function handleHover(e) {
        e.preventDefault()
        setHover(!hover)
    }
    function handleDropdown(e) {
        e.preventDefault()
        setShow(true)
    }

    function closeDropdown() {
        setShow(false)
    }

    return (
        <>
            <div id='navCont'>
                <Link to='/index' id='homeNavButton' onClick={closeDropdown}>Home</Link>
                <Wallet wallet={wallet} connect={connect} />
                {user ?
                    (
                        <><div id='dropdownCont' style={hover ? { color: 'blue' } : { color: 'black' }} onMouseOver={handleHover} onMouseOut={handleHover} onClick={handleDropdown}>
                            <Icon id='profileIcon' size='large' className='user outline'></Icon>
                            <Icon id='downArrowIcon' size='small' className='setting'></Icon>
                        </div>
                            {show ?
                                (
                                    <Dropdown setShow={setShow} handleLogout={handleLogout} />
                                ) : null}
                        </>)
                    :
                    (<Link to='/login' id='loggedUserNavButton' onClick={handleLogout}>Login/Register</Link>)
                }
            </div >
            {location.pathname == '/index' ?
                <WelcomeHeader />
                :
                <HeaderImage />
            }
        </>
    )
}