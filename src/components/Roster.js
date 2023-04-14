import React from "react";
import Card from "./Card";

function Roster({ cards, onAddCharacterPopup, resetPopupStates, title, onCardDelete, roster, rosterSetter, rosterType }) {
    return (
        <div className={`characters characters_type_${rosterType}`}>
            <h2 className="characters__title">{title}</h2>
            <div className="characters__roster-container">
                <ul className="characters__list">
                    {cards.map((card, index) => (
                        <Card
                            key={index}
                            id={index}
                            card={card}
                            onCardDelete={onCardDelete}
                            roster={roster}
                            rosterSetter={rosterSetter}
                        />
                    ))}
                </ul>
                <button className="characters__add-btn" onClick={() => { resetPopupStates(); onAddCharacterPopup(true) }}>Add</button>
            </div>
        </div>
    )
}

export default Roster