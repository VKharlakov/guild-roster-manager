import './Navbar.css';
import React from "react";
import { Link, NavLink } from "react-router-dom";

function Navbar() {
    return (
        <nav className='navbar'>
            <Link to={'/guilds'} className='navbar__back-link'/>
            <ul className='navbar__link-list'>
                <li className="navbar__link-container">
                    <NavLink to={'raid'} className={({isActive}) => 
                    isActive 
                    ? 'navbar__link navbar__link_active' 
                    : 'navbar__link'}>Raid</NavLink>
                </li>
                <li className="navbar__link-container">
                    <NavLink to={'mythic-plus'} className={({isActive}) => 
                    isActive 
                    ? 'navbar__link navbar__link_active' 
                    : 'navbar__link'}>M+</NavLink>
                </li>
            </ul>
        </nav>
    )
}

export default Navbar