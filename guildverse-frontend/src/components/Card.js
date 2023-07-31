import React from "react";
import { classColorList }  from "../utils/constants";

function Card({card, onCardDelete, roster, rosterSetter, id}) {
    const classColor = classColorList[`${card.class}`]
    const role = card.role
    console.log(card)
    //Delete card handlerS
    function handleDeleteClick() {
        onCardDelete(roster, rosterSetter, id)
    }

    return (
        <li className="roster__element">
            <button className="roster__delete-btn" onClick={handleDeleteClick} />
            <span className={`roster__role roster__role_type_${role}`}/>
            <img src={card.avatar} alt="Char pic" className="roster__avatar" />
            <div className="roster__info" style={{backgroundColor: classColor}}>
                <p className="roster__name">{card.name}</p>
                <p className="roster__ilvl">{card.ilvl}</p>
            </div>
        </li>
    )
}

export default Card