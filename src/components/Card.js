import React from "react";

function Card({card}) {
    return (
        <li className="characters__element">
            <button className="characters__delete-btn"></button>
            <span className="characters__role"></span>
            <img src={card.thumbnail_url} alt="Char pic" className="characters__avatar" />
            <div className="characters__info">
                <p className="characters__name">{card.name}</p>
                <p className="characters__ilvl">{card.gear.item_level_equipped}</p>
            </div>
        </li>
    )
}

export default Card