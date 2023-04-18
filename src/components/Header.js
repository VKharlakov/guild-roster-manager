import React from "react";
import { Link } from "react-router-dom";

function Header({activeGuildData = {name: '', active_members: ''}}) {
    return (
        <header className="header">
            <Link to={'/'} className="header__logo" />
            <div className="header__title-container">
                <h1 className="header__title">{`${activeGuildData.name}` || 'GuildManager'}</h1>
                <p className="header__brief">{(activeGuildData.active_members.length != 0) ? `${activeGuildData.active_members.length} active members` : ''}</p>
            </div>
        </header>
    )
}

export default Header