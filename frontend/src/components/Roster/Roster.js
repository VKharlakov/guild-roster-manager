import './Roster.css'
import React from "react";
import Preloader from '../Preloader/Preloader';
import Character from "../Character/Character";
import { compareByRole } from '../../utils/utils';
import RostersSkeleton from './RostersSkeleton/RostersSkeleton';
import RosterInfoPanel from "../RosterInfoPanel/RosterInfoPanel";

function Roster({
    name,
    size,
    rosterId,
    guildData,
    characters,
    rosterType,
    isAddPopup,
    addPopupInfo,
    setIsAddPopup,
    setAddPopupInfo,
    isUpdatingRoster,
    isAddingCharacter,
    isRosterPreloader,
    handleDeleteRoster,
    handleDeleteCharacter,
}) {
    const [raiting, setRaiting] = React.useState(0)                                         //M+ rating state
    const [characterList, setCharacterList] = React.useState(characters)                    //Characters array state 
    const [isPreloader, setIsPreloader] = React.useState(isRosterPreloader)                 //Preloader state
    const [roles, setRoles] = React.useState({ tanks: 0, healers: 0, dps: 0, total: 0 })    //Raid role counter state

    //Count amount of each role
    function countRoles(role) {
        let amount = 0
        characters.forEach((item) => {
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
            total: characters.length
        })
    }

    //Count raiting score
    function countRaiting() {
        let amount = 0
        characters.forEach((item) => {
            amount += item.mythicPlusRaiting
        })
        amount = amount / characters.length
        return Math.floor(amount)
    }

    //Handle add raiting score to raiting state
    function handleSetRaiting() {
        setRaiting(countRaiting)
    }

    // Delete roster click
    function onDeleteRoster() {
        setIsPreloader(true)
        handleDeleteRoster({ _id: rosterId, parentId: guildData._id })
    }

    // Add character click
    function onAddCharacter() {
        // If a popup is already open, then "close" and reopen
        if (isAddPopup && addPopupInfo.rosterName !== name) {
            setIsAddPopup(false)
            setTimeout(() => {
                setIsAddPopup(true)
                setAddPopupInfo({
                    rosterId: rosterId,
                    rosterName: name,
                    rosterSize: size
                })
            }, 200)
        } else {
            setIsAddPopup(true)
            setAddPopupInfo({
                rosterId: rosterId,
                rosterName: name,
                rosterSize: size
            })
        }
    }

    // Canceling Preloader if an error occures while deleting
    React.useEffect(() => {
        setIsPreloader(isRosterPreloader)
    }, [isRosterPreloader])


    React.useEffect(() => {
        setCharacterList(characters)
    }, [characters])

    React.useEffect(() => {
        setIsPreloader(isUpdatingRoster)
    }, [isUpdatingRoster])

    return (
        <div className={`roster roster_type_${rosterType}`}>
            <h2 className="roster__title">{name}</h2>
            <button className='roster__delete-button' onClick={() => onDeleteRoster()} />
            <ul className="roster__characters">
                {characterList.sort(compareByRole).map((character) => (
                    <Character
                        key={character._id}
                        character={character}
                        parentId={rosterId}
                        handleDeleteCharacter={handleDeleteCharacter}
                    />
                ))}
                {isAddingCharacter && isUpdatingRoster &&
                    <RostersSkeleton />
                }
                {characterList.length < size && !isAddingCharacter &&
                    <button className='roster__add-character-button' onClick={() => onAddCharacter()} />
                }
            </ul>
            {(rosterType === 'raid') &&
                <RosterInfoPanel
                    counter={handleSetRoles}
                    array={roles}
                    rosterType={rosterType}
                    roster={characters}>
                </RosterInfoPanel>
            }
            {(rosterType === 'mythic-plus') &&
                <RosterInfoPanel
                    counter={handleSetRaiting}
                    array={raiting}
                    rosterType={rosterType}
                    roster={characters}>
                </RosterInfoPanel>
            }
            <Preloader isActive={isPreloader} />
        </div>
    )
}

export default Roster