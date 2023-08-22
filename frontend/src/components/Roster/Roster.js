import './Roster.css'
import React from "react";
import Character from "../Character/Character";
import RosterInfoPanel from "../RosterInfoPanel/RosterInfoPanel";
import { CurrentGuildContext } from '../../contexts/CurrentGuildContext';
import Preloader from '../Preloader/Preloader';
import { compareByRole } from '../../utils/utils';
import RostersSkeleton from './RostersSkeleton/RostersSkeleton';
import guildRMApi from '../../utils/guildRMApi';

function Roster({
    name,
    size,
    rosterId,
    characters,
    rosterType,
    isRosterPreloader,
    isAddPopup,
    addPopupInfo,
    setIsAddPopup,
    handleDeleteRoster,
    setAddPopupInfo,
    isUpdatingRoster,
    setIsErrorPopup,
    setErrorPopupInfo,
}) {
    const [raiting, setRaiting] = React.useState(0)
    const [characterList, setCharacterList] = React.useState(characters)
    const [isPreloader, setIsPreloader] = React.useState(isRosterPreloader)
    const [roles, setRoles] = React.useState({ tanks: 0, healers: 0, dps: 0, total: 0 })

    const currentGuild = React.useContext(CurrentGuildContext)


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
            amount += item.mythic_plus_raiting
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
        handleDeleteRoster({ _id: rosterId, parentId: currentGuild._id })
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

    function deleteRaidCharacter(data) {
        if (rosterId === data.parentId) {
            setIsPreloader(true)
        }

        guildRMApi.deleteRaidCharacter(data)
            .then((deletedCharacter) => {
                setCharacterList(characterList.filter(character => character._id !== deletedCharacter._id))
            })
            .catch((err) => {
                // if can't connect to guildRMApi servers
                setIsErrorPopup(true)
                setErrorPopupInfo({
                    title: 'Server is not responding',
                    text: 'An unexpected error has occurred. Something has happened with our servers. Please, try again later.',
                    buttonText: 'Ok',
                })
                console.log('Roster deleteRaidCharacter error:', err)
            })
            .finally(() => {
                setIsPreloader(false)
            })
    }

    function deleteMythicPlusCharacter(data) {
        if (rosterId === data.parentId) {
            setIsPreloader(true)
        }

        guildRMApi.deleteMythicPlusCharacter(data)
            .then((deletedCharacter) => {
                setCharacterList(characterList.filter(character => character._id !== deletedCharacter._id))
            })
            .catch((err) => {
                console.log('Roster deleteMythicPlusCharacter error:', err)
            })
            .finally(() => {
                setIsPreloader(false)
            })
    }

    function handleDeleteCharacter(data) {

        rosterType === 'raid' && deleteRaidCharacter(data)
        rosterType === 'mythic-plus' && deleteMythicPlusCharacter(data)
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
                {isUpdatingRoster &&
                    <RostersSkeleton />
                }
                {characterList.length < size && !isUpdatingRoster &&
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