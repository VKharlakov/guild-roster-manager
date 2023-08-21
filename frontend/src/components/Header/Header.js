import './Header.css'
import React from "react";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import { CurrentGuildContext } from "../../contexts/CurrentGuildContext";
import Home from '../Home/Home';

function Header({ setIsAddPopup }) {
    //Using useContext to get current guild data
    const currentGuild = React.useContext(CurrentGuildContext)
    const currentPath = decodeURIComponent(useLocation().pathname)

    function onAdd() {
        setIsAddPopup(true)
    }

    function defaultHeader() {
        return (
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
        )
    }

    function guildHeader() {
        return (
            <header className="header">
                <div className="header__title-container">
                    <h1 className="header__title">{currentGuild.name || 'GuildManager'}</h1>
                    <p className="header__brief">{`${currentGuild.members.length} active members` || ''}</p>
                </div>
            </header>
        )
    }

    return (
        <>
            {currentPath === `/guilds/${currentGuild.name.replace(/\s/g, '-').toLowerCase()}`
                || currentPath === `/guilds/${currentGuild.name.replace(/\s/g, '-').toLowerCase()}/raid`
                || currentPath === `/guilds/${currentGuild.name.replace(/\s/g, '-').toLowerCase()}/mythic-plus`
                ? guildHeader()
                : defaultHeader()}

            {currentPath === '/' &&
                <Home />
            }

            <Outlet />
        </>
    )
}

export default Header