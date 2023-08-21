import './Character.css'
import React from "react";
import { classColorList } from "../../utils/constants";
// import Preloader from '../Preloader/Preloader';

function Character({
    parentId,
    character,
    // isUpdatingCharacter,
    handleDeleteCharacter,
}) {
    const classColor = classColorList[`${character.class}`]
    // const [isPreloader, setIsPreloader] = React.useState(false)

    function onDelete(event) {
        event.preventDefault()

        handleDeleteCharacter({ characterId: character._id, parentId: parentId })
    }

    // React.useEffect(() => {
    //     setIsPreloader(isUpdatingCharacter)
    // }, [isUpdatingCharacter])


    return (
        <li className="character">
            <a className='character__link' href={`${character.rioProfile}`} target='_blank' rel='noreferrer'>
                <button className="character__delete-btn" onClick={(event) => onDelete(event)} />
                <span className={`character__role character__role_type_${character.role}`} />
                <img src={character.avatar} alt="Char pic" className="character__avatar" />
                <div className="character__info" style={{ backgroundColor: classColor }}>
                    <p className="character__name">{character.name}</p>
                    <p className="character__ilvl">{character.ilvl}</p>
                </div>
            </a>
            {/* <Preloader isActive={isPreloader} /> */}
        </li>
    )
}

export default Character