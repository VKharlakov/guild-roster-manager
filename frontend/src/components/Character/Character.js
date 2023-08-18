import './Character.css'
import React from "react";
import { classColorList }  from "../../utils/constants";

function Card({card, onCardDelete, roster, rosterSetter, id}) {
    const classColor = classColorList[`${card.class}`]
    const role = card.role
    //Delete card handlerS
    function handleDeleteClick() {
        onCardDelete(roster, rosterSetter, id)
    }

    return (
        <li className="character">
            <button className="character__delete-btn" onClick={handleDeleteClick} />
            <span className={`character__role character__role_type_${role}`}/>
            <img src={card.avatar} alt="Char pic" className="character__avatar" />
            <div className="character__info" style={{backgroundColor: classColor}}>
                <p className="character__name">{card.name}</p>
                <p className="character__ilvl">{card.ilvl}</p>
            </div>
        </li>
    )
}

export default Card