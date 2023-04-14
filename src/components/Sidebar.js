import React from "react";
import { NavLink } from "react-router-dom";

function Sidebar() {
    return (
        <section className="sidebar">
            <ul className="sidebar__element-list">
                <li className="sidebar__element">
                    <NavLink to={'/raid'} className={({ isActive }) => isActive ? 'sidebar__btn sidebar__btn_clicked' : 'sidebar__btn'}>Raid</NavLink>
                </li>
                <li className="sidebar__element">
                    <NavLink to={'/mythic-plus'} className={({ isActive }) => isActive ? 'sidebar__btn sidebar__btn_clicked' : 'sidebar__btn'}>M+</NavLink>
                </li>
                <li className="sidebar__element">
                    <button className="sidebar__btn">Other</button>
                </li>
                <button className="sidebar__toggle-btn"></button>
            </ul>
        </section>
    )
}

export default Sidebar