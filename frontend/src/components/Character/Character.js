import './Character.css'
import React from "react";
import { classColorList } from "../../utils/constants";

function Character({
    parentId,
    character,
    handleDeleteCharacter,
}) {
    const classColor = classColorList[`${character.class}`]
    const [isDeleting, setIsDeleting] = React.useState(false)

    function onDelete(event) {
        event.preventDefault()
        setIsDeleting(true)
        console.log(isDeleting)
        handleDeleteCharacter({ characterId: character._id, parentId: parentId })
    }

    return (
        <li className="character">
            <a className={`character__link${isDeleting ? ' character__link_no-hover' : ''}`} href={`${character.rioProfile}`} target='_blank' rel='noreferrer'>
                <button className="character__delete-btn" onClick={(event) => onDelete(event)} />
                <span className={`character__role character__role_type_${character.role}`} />
                <img src={character.avatar} alt="Char pic" className="character__avatar" />
                <div className="character__info" style={{ backgroundColor: classColor }}>
                    <p className="character__name">{character.name}</p>
                    <p className="character__ilvl">{character.ilvl}</p>
                </div>
            </a>
        </li>
    )
}

export default Character