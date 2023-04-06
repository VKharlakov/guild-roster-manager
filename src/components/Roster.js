import React from "react";

function Roster() {
    return (
        <div className="characters characters_type_raid-one">
            <h2 className="characters__title">Main roster</h2>
            <div className="characters__roster-container">
                <ul className="characters__list">
                </ul>
                <button className="characters__add-btn" id="add-btn_raid-one"></button>
            </div>
        </div>
    )
}

export default Roster