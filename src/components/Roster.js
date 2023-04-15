import React from "react";
import Card from "./Card";

function Roster({ onAddCharacterPopup, resetPopupStates, title, onCardDelete, roster, rosterSetter, rosterType }) {
    //Count amount of each role
    const countRoles = (role) => {
        let amount = 0
        roster.forEach((item) => {
            if(item.role === role) {
                amount++
            }
        })
        return amount
    }
    
    let tanksAmount = countRoles('tank')        //Tanks amount variable
    let healersAmount = countRoles('healing')   //Healers amount variable
    let dpsAmount = countRoles('dps')           //Dps amount variable
    let allRolesAmount = roster.length          //Total amount variable


    return (
        <div className="roster">
            <h2 className="roster__title">{title}</h2>
            <div className={`roster__characters-container roster__characters-container_type_${rosterType}`}>
                <ul className="roster__list">
                    {roster.map((card, index) => (
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
                <button className="roster__add-btn" onClick={() => { resetPopupStates(); onAddCharacterPopup(true) }}>Add</button>
            </div>
            {(rosterType === 'raid') && <div className="roster__info-panel">
                <div className="roster__info-element">
                    <p className="roster__info-number">{tanksAmount}</p>
                    <div className="roster__info-role-icon roster__info-role-icon_type_tanks"/>
                </div>
                <div className="roster__info-element">
                    <p className="roster__info-number">{healersAmount}</p>
                    <div className="roster__info-role-icon roster__info-role-icon_type_healers"/>
                </div>
                <div className="roster__info-element">
                    <p className="roster__info-number">{dpsAmount}</p>
                    <div className="roster__info-role-icon roster__info-role-icon_type_dps"/>
                </div>
                <div className="roster__info-element">
                    <p className="roster__info-number">{allRolesAmount}</p>
                    <div className="roster__info-role-icon"/>
                </div>
            </div>}
        </div>
    )
}

export default Roster