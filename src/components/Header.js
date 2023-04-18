import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { CurrentGuildContext } from "../contexts/CurrentGuildContext";

function Header() {
    //Using useContext to get current guild data
    const currentGuild = useContext(CurrentGuildContext)

    return (
        <header className="header">
            <Link to={'/'} className="header__logo" />
            <div className="header__title-container">
                <h1 className="header__title">{`${currentGuild.name}` || 'GuildManager'}</h1>
                <p className="header__brief">{(currentGuild.active_members.length != 0) ? `${currentGuild.active_members.length} active members` : ''}</p>
            </div>
        </header>
    )
}

export default Header