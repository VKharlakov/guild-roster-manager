import React from "react";
import { NavLink } from "react-router-dom";

function Sidebar() {
    return (
        <section className="sidebar">
            <div className="sidebar__element">
                <NavLink to={'/raid'} className={({isActive}) => isActive ? 'sidebar__btn sidebar__btn_clicked' : 'sidebar__btn'}>Raid</NavLink>
            </div>
            <div className="sidebar__element">
                <NavLink to={'/mythic-plus'} className={({isActive}) => isActive ? 'sidebar__btn sidebar__btn_clicked' : 'sidebar__btn'}>M+</NavLink>
            </div>
            <div className="sidebar__element">
                <button className="sidebar__btn">Other</button>
            </div>
            <button className="sidebar__toggle-btn"></button>
        </section>
    )
}

export default Sidebar