import './Roster.css'
import React from "react";
import Character from "../Character/Character";
import RosterInfoPanel from "../RosterInfoPanel/RosterInfoPanel";

function Roster({ onAddCharacterPopup, resetPopupStates, title, onCardDelete, roster, rosterSetter, rosterType, rosterMaxLength }) {
    const [roles, setRoles] = React.useState({ tanks: 0, healers: 0, dps: 0, total: 0 })
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
        <div className={`roster roster_type_${rosterType}`}>
            <h2 className="roster__title">{title}</h2>
            <button className='roster__delete-button'/>
            <ul className="roster__characters">
                {roster.map((card, index) => (
                    <Character
                        key={index}
                        id={index}
                        card={card}
                        onCardDelete={onCardDelete}
                        roster={roster}
                        rosterSetter={rosterSetter}
                    />
                ))}
                {roster.length < rosterMaxLength &&
                    <button className='roster__add-character-button' onClick={() => onAddCharacterPopup(true)} />
                }
            </ul>
            {/* <button className="roster__add-btn" onClick={() => { resetPopupStates(); onAddCharacterPopup(true) }}>Add</button> */}
            {(rosterType === 'raid') &&
                <RosterInfoPanel
                    counter={handleSetRoles}
                    array={roles}
                    rosterType={rosterType}
                    roster={roster}>
                </RosterInfoPanel>
            }
            {(rosterType === 'mythic-plus') &&
                <RosterInfoPanel
                    counter={handleSetRaiting}
                    array={raiting}
                    rosterType={rosterType}
                    roster={roster}>
                </RosterInfoPanel>
            }
        </div>
    )
}

export default Roster