import React from "react";

function Card() {
    return (
        <li className="characters__element">
            <button className="characters__delete-btn"></button>
            <span className="characters__role"></span>
            <img src="#" alt="Char pic" className="characters__avatar" />
                <div className="characters__info">
                    <p className="characters__name"></p>
                    <p className="characters__ilvl"></p>
                </div>
        </li>
    )
}

export default Card