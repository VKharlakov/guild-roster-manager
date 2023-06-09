import React from "react";
import Card from "./Card";
import InfoPanel from "./InfoPanel";

function Roster({ onAddCharacterPopup, resetPopupStates, title, onCardDelete, roster, rosterSetter, rosterType }) {
    const [roles, setRoles] = React.useState({tanks: 0, healers: 0, dps: 0, total: 0})
    const [raiting, setRaiting] = React.useState(0)
    
    //Count amount of each role
    function countRoles(role) {
        let amount = 0
        roster.forEach((item) => {
            if (item.role === role) {
                amount++
            }
        })
        return amount
    }
    
    //Handle add roles to roles array
    function handleSetRoles() {
        setRoles({
            tanks: countRoles('tank'),
            healers: countRoles('healing'),
            dps: countRoles('dps'),
            total: roster.length
        })
    }

    //Count raiting score
    function countRaiting() {
        let amount = 0
        roster.forEach((item) => {
            amount += item.mythic_plus_raiting
        })
        amount = amount / roster.length
        return Math.floor(amount)
    }

    //Handle add raiting score to raiting state
    function handleSetRaiting() {
        setRaiting(countRaiting)
    }

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
            {(rosterType === 'raid') &&
                <InfoPanel 
                counter={handleSetRoles} 
                array={roles} 
                rosterType={rosterType} 
                roster={roster}>
                </InfoPanel>
            }
            {(rosterType === 'mythic-plus') &&
                <InfoPanel 
                counter={handleSetRaiting}
                array={raiting}
                rosterType={rosterType}
                roster={roster}>
                </InfoPanel>
            }
        </div>
    )
}

export default Roster