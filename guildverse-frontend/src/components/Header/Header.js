import React from "react";
import './Header.css'
import { Link } from "react-router-dom";
import { CurrentGuildContext } from "../../contexts/CurrentGuildContext";

function Header({ isGuildHeader }) {
    //Using useContext to get current guild data
    const currentGuild = React.useContext(CurrentGuildContext)

    function defaultHeader() {
        return (
            <header className="header">
                <Link to={'/'} className="header__logo header__logo_type_default" />
                <div className="header__title-container">
                    <h1 className="header__title">GuildVerse</h1>
                </div>
                <div className="header__add">
                    <label className="header__add-label" htmlFor='add'>Add</label>
                    <button className="header__add-button" id='add'></button>
                </div>
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