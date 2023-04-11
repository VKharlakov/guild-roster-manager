import React from "react";

function Sidebar({ onRaidClick, onMythicPlusClick, resetSectionStates }) {
    return (
        <section className="sidebar">
            <div className="sidebar__element">
                <button className="sidebar__btn" onClick={() => { resetSectionStates(); onRaidClick(true) }}>Raid</button>
            </div>
            <div className="sidebar__element">
                <button className="sidebar__btn" onClick={() => { resetSectionStates(); onMythicPlusClick(true) }}>M+</button>
            </div>
            <div className="sidebar__element">
                <button className="sidebar__btn">Other</button>
            </div>
            <button className="sidebar__toggle-btn"></button>
        </section>
    )
}

export default Sidebar