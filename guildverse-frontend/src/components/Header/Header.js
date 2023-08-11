import './Header.css'
import React from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { CurrentGuildContext } from "../../contexts/CurrentGuildContext";

function Header({ isGuildHeader, handleAddGuild }) {
    //Using useContext to get current guild data
    const currentGuild = React.useContext(CurrentGuildContext)
    const currentPath = useLocation().pathname

    function defaultHeader() {
        return (
            <header className='header'>
                <nav className={`header__nav ${currentPath === '/' ? 'header__nav_type_home' : ''}`}>
                    <NavLink className={({ isActive }) => isActive ? 'header__link header__link_type_home header__link_active' : 'header__link'} to={'/'}>GuildVerse</NavLink>
                    <>
                        <span className={`header__link-arrow ${currentPath === '/' ? 'header__link-arrow_hidden' : ''}`} />
                        <NavLink className={({ isActive }) => isActive ? 'header__link header__link_active' : 'header__link header__link_hidden'} to={'/guilds'}>Guilds</NavLink>
                    </>
                </nav>
                {currentPath === '/guilds' &&
                    <div className="header__add">
                        <label className="header__add-label" htmlFor='add'>Add</label>
                        <button className="header__add-button" id='add' onClick={() => { handleAddGuild(true) }}></button>
                    </div>
                }
            </header>
        )
    }

    function guildHeader() {
        return (
            <header className="header">
                <Link to={'/guilds'} className="header__logo header__logo_type_guild" />
                <div className="header__title-container">
                    <h1 className="header__title">{currentGuild.name || 'GuildManager'}</h1>
                    <p className="header__brief">{`${currentGuild.active_members.length} active members` || ''}</p>
                </div>
            </header>
        )
    }

    return (
        isGuildHeader ? guildHeader() : defaultHeader()
    )
}

export default Header