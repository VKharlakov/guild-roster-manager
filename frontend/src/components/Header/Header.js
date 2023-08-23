import './Header.css'
import React from "react";
import Home from '../Home/Home';
import { NavLink, Outlet, useLocation } from "react-router-dom";

function Header({ setIsAddPopup }) {
    const currentPath = decodeURIComponent(useLocation().pathname)

    // Open add guild popup
    function onAdd() {
        setIsAddPopup(true)
    }

    return (
        <>
            {(currentPath === '/' || currentPath === '/guilds') &&
                <header className='header'>
                    <nav className={`header__nav ${currentPath === '/' ? 'header__nav_type_home' : ''}`}>
                        <NavLink className={({ isActive }) => isActive ? 'header__link header__link_type_home header__link_active' : 'header__link'} to={'/'}>GuildRM</NavLink>
                        <>
                            <span className={`header__link-arrow ${currentPath === '/' ? 'header__link-arrow_hidden' : ''}`} />
                            <NavLink className={({ isActive }) => isActive ? 'header__link header__link_active' : 'header__link header__link_hidden'} to={'/guilds'}>Guilds</NavLink>
                        </>
                    </nav>
                    {currentPath === '/guilds' &&
                        <div className="header__add">
                            <label className="header__add-label" htmlFor='add'>Add</label>
                            <button className="header__add-button" id='add' onClick={() => onAdd()}></button>
                        </div>
                    }
                </header>
            }

            {currentPath === '/' &&
                <Home />
            }

            <Outlet />
        </>
    )
}

export default Header