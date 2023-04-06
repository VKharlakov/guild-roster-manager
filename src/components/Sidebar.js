import React from "react";

function Sidebar() {
    return (
        <section className="sidebar">
            <div className="sidebar__element">
                <button className="sidebar__btn">Raid</button>
            </div>
            <div className="sidebar__element">
                <button className="sidebar__btn">M+</button>
            </div>
            <div className="sidebar__element">
                <button className="sidebar__btn">Other</button>
            </div>
            <button className="sidebar__toggle-btn"></button>
        </section>
    )
}

export default Sidebar