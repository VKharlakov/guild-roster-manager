import './AddPopup.css'
import React, { useContext } from "react";
import { euServerList as servers } from "../../utils/constants";
import Tooltip from "../Tooltip/Tooltip";
import { CurrentGuildContext } from "../../contexts/CurrentGuildContext";

function AddPopup({
    isActive,
    rosterId,
    rosterName,
    rosterSize,
    popupType,
    setIsAddPopup,
    handleAddGuild,
    isUpdatingRoster,
    isAddingGuild,
    handleAddCharacter,
}) {
    //Using useContext to get current guild data
    const currentGuild = useContext(CurrentGuildContext)

    //Accumulating input values
    const [formValue, setFormValue] = React.useState({ realm: "", name: "", region: "eu" })

    //ToolTip-related states
    const [isToolTipOpen, setIsToolTipOpen] = React.useState(false)
    const [currentToolTipArray, setCurrentToolTipArray] = React.useState()
    const [currentInputType, setCurrentInputType] = React.useState('')
    const [memberList, setMemberList] = React.useState([])
    const [isButtonDisabled, setIsButtonDisabled] = React.useState(false)

    //Function when an input is focused
    function onInputFocus(toolTipArray, inputType) {
        setIsToolTipOpen(true)
        setCurrentInputType(inputType)
        setCurrentToolTipArray(toolTipArray)
    }

    //Function that searches for matching names from array
    function search(value, toolTipArray) {
        setCurrentToolTipArray(toolTipArray.filter(item => item.name.toLowerCase().startsWith(value.trim().toLowerCase())))
    }

    //Function when typing inside of an input
    function onChange(e, toolTipArray) {
        const { name, value } = e.target
        //Searching for matching items
        search(value, toolTipArray)

        //Rewriting input values
        setFormValue({
            ...formValue,
            [name]: value
        })
    }

    function handleToolTipClick(input, inputValue) {
        if (input === 'realm') {
            setFormValue({ ...formValue, realm: inputValue })
        } else if (input === 'name') {
            setFormValue({ ...formValue, name: inputValue })
        }
    }

    // Function when Submit
    function onCharacterSubmit(event) {
        event.preventDefault()

        handleAddCharacter({ ...formValue, parentId: rosterId, rosterSize: rosterSize})
    }

    //Function when Submit
    function onGuildSubmit(event) {
        event.preventDefault()

        handleAddGuild(formValue)
    }

    //Set array of members
    React.useEffect(() => {
        setFormValue({ ...formValue, realm: "", name: "" })
        if (currentGuild.members.length > 0) {
            setMemberList(currentGuild.members.map((member) => member.character))
        }
    }, [currentGuild, isActive])

    function addCharacterForm() {
        return (
            <form className="add-popup__form add-popup__form_type_character" name="form" onSubmit={(event) => { onCharacterSubmit(event) }}>
                <div className="add-popup__inputs">
                    <input
                        onFocus={() => { onInputFocus(servers, 'realm') }}
                        onChange={(event) => { onChange(event, servers) }}
                        className="add-popup__input add-popup__input_type_text"
                        name="realm"
                        placeholder="Enter your realm"
                        value={formValue.realm}
                        minLength="3"
                        required
                        autoComplete="off"
                    />
                    <input
                        onFocus={() => { onInputFocus(memberList, 'name') }}
                        onChange={(event) => { onChange(event, memberList) }}
                        className="add-popup__input add-popup__input_type_text"
                        name="name"
                        placeholder="Enter your character name"
                        value={formValue.name}
                        minLength="3"
                        required
                        autoComplete="off"
                    />
                </div>
                <button className="add-popup__submit-button" type="submit" disabled={isUpdatingRoster || isButtonDisabled}>{!isUpdatingRoster ? 'Submit' : 'Please wait...'}</button>
            </form>
        )
    }

    function addGuildForm() {
        return (
            <form className="add-popup__form add-popup__form_type_guild" name="form" onSubmit={(event) => onGuildSubmit(event)}>
                <div className="add-popup__inputs">
                    <div className="add-popup__radio-container">
                        <label className="add-popup__radio-label">
                            EU
                            <input
                                type="radio"
                                name="region"
                                className="add-popup__radio-input"
                                defaultChecked
                            />
                            <span className="add-popup__radio-input-custom" />
                        </label>
                        {/* <label className="add-popup__radio-label">
                            US
                            <input
                                type="radio"
                                name="region"
                                className="add-popup__radio-input"
                            />
                            <span className="add-popup__radio-input-custom" />
                        </label> */}
                    </div>
                    <input
                        className="add-popup__input add-popup__input_type_text"
                        name="realm"
                        value={formValue.realm}
                        onChange={(event) => onChange(event, [])}
                        placeholder="Enter guild realm"
                        autoComplete="off"
                        required
                    />
                    <input
                        className='add-popup__input add-popup__input_type_text'
                        name='name'
                        onChange={(event) => onChange(event, [])}
                        value={formValue.name}
                        placeholder='Enter guild title'
                        autoComplete='off'
                        required
                    />
                </div>
                <button className="add-popup__submit-button" type="submit" disabled={isAddingGuild || isButtonDisabled}>{!isAddingGuild ? 'Submit' : 'Please wait...'}</button>
            </form>
        )
    }

    return (
        <div className={`add-popup${isActive ? ' add-popup_active' : ''}`}>
            <button className="add-popup__close-button" onClick={() => { setIsAddPopup(false) }} />
            {popupType === 'character'
                ? <h2 className="add-popup__title">Add to <span className="add-popup__title-highlight">{rosterName}</span></h2>
                : <h2 className='add-popup__title'>Add your Guild</h2>
            }
            {popupType === 'character'
                ? addCharacterForm()
                : addGuildForm()
            }

            {isToolTipOpen && currentToolTipArray.length >= 1 && <Tooltip array={currentToolTipArray} input={currentInputType} onClick={handleToolTipClick} onClose={setIsToolTipOpen} />}
        </div>
    )
}

export default AddPopup