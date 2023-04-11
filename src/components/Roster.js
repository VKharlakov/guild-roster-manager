import React from "react";
import Card from "./Card";

function Roster({ cards, onAddCharacterPopup, resetPopupStates, title }) {
    return (
        <div className="characters characters_type_raid-one">
            <h2 className="characters__title">{title}</h2>
            <div className="characters__roster-container">
                <ul className="characters__list">
                    {cards.map((card) => (
                        <Card
                            card={card}
                        />
                    ))}
                </ul>
                <button className="characters__add-btn" onClick={() => { resetPopupStates(); onAddCharacterPopup(true) }}></button>
            </div>
        </div>
    )
}

export default Roster