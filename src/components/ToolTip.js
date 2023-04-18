import React from "react";

function ToolTip({array}) {
    return (
        <div className="popup__tooltip-container">
            <ul className="popup__tooltip">
                {array.map((item, index) => (
                    <li className="popup__tooltip-text" key={index}>{item.name}</li>
                ))}
            </ul>
        </div>
    )
}

export default ToolTip