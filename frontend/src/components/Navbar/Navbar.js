import './Navbar.css';
import React from "react";
import { Link, NavLink, useLocation } from "react-router-dom";

function Navbar() {
    const currentPath = useLocation().pathname

    return (
        <nav className='navbar'>
            <Link to={'/guilds'} className='navbar__back-link' />
            <ul className='navbar__link-list'>
                <li className="navbar__link-container">
                    <NavLink to={'raid'} className={({ isActive }) =>
                        isActive
                            ? 'navbar__link navbar__link_active'
                            : 'navbar__link'}>
                        Raid
                    </NavLink>
                </li>
                <li className="navbar__link-container">
                    <NavLink to={''} className={({ isActive }) =>
                        isActive && !(currentPath.endsWith('/raid') || currentPath.endsWith('/mythic-plus'))
                            ? 'navbar__link navbar__link_type_home navbar__link_active'
                            : 'navbar__link navbar__link_type_home'}>
                    </NavLink>
                </li>
                <li className="navbar__link-container">
                    <NavLink to={'mythic-plus'} className={({ isActive }) =>
                        isActive
                            ? 'navbar__link navbar__link_active'
                            : 'navbar__link'}>
                        M+
                    </NavLink>
                </li>
            </ul>
        </nav>
    )
}

export default Navbar