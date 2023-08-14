import './AddPopup.css'
import React, { useContext } from "react";
import { euServerList as servers } from "../../utils/constants";
import Tooltip from "../Tooltip/Tooltip";
import { CurrentGuildContext } from "../../contexts/CurrentGuildContext";

function AddPopup({ popupType, onCardAdd, isActive, onClose, roster, rosterSetter, rosterMaxLength, rosterTitle }) {
    //Using useContext to get current guild data
    const currentGuild = useContext(CurrentGuildContext)

    //Accumulating input values
    const [formValue, setFormValue] = React.useState({ realm: "", name: "", region: "eu" })

    //Disable button state
    const [isDisabled, setIsDisabled] = React.useState(false)

    //ToolTip-related states
    const [isToolTipOpen, setIsToolTipOpen] = React.useState(false)
    const [currentToolTipArray, setCurrentToolTipArray] = React.useState()
    const [currentInputType, setCurrentInputType] = React.useState('')
    const [memberList, setMemberList] = React.useState([])

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

    // //Check if roster reached its limit of characters
    // function disableButtonOnLimit() {
    //     if (roster.length >= rosterMaxLength) {
    //         setIsDisabled(true)
    //     } else {
    //         setIsDisabled(false)
    //     }
    // }

    //Function when Submit
    function onSubmit(e) {
        e.preventDefault()

        onCardAdd(formValue, roster, rosterSetter)
        setFormValue({ ...formValue, realm: "", name: "" })
        onClose(false)
    }

    // //Prevent from overflowing roster; check if it hit max amount of characters
    // React.useEffect(() => {
    //     disableButtonOnLimit()
    // }, [roster])

    //Set array of members
    React.useEffect(() => {
        setFormValue({ ...formValue, realm: "", name: "" })
        setMemberList(currentGuild.active_members.map((member) => member.character))
    }, [currentGuild, isActive])

    function addCharacterInputs() {
        return (
            <>
                <input
                    onFocus={() => { onInputFocus(servers, 'realm') }}
                    onChange={(event) => { onChange(event, servers) }}
                    className="popup__input popup__input_type_text"
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
                    className="popup__input popup__input_type_text"
                    name="name"
                    placeholder="Enter your character name"
                    value={formValue.name}
                    minLength="3"
                    required
                    autoComplete="off"
                />
            </>
        )
    }

    function addGuildInputs() {
        return (
            <>
                <div className="popup__radio-container">
                    <label className="popup__radio-label">
                        EU
                        <input
                            type="radio"
                            name="region"
                            className="popup__radio-input"
                            defaultChecked
                        />
                        <span className="popup__radio-input-custom" />
                    </label>
                    <label className="popup__radio-label">
                        US
                        <input
                            type="radio"
                            name="region"
                            className="popup__radio-input"
                        />
                        <span className="popup__radio-input-custom" />
                    </label>
                </div>
                <input
                    className="popup__input popup__input_type_text"
                    name="realm"
                    placeholder="Enter guild realm"
                    autoComplete="off"
                />
                <input
                    className='popup__input popup__input_type_text'
                    name='title'
                    placeholder='Enter guild title'
                    autoComplete='off'
                />
            </>
        )
    }

    return (
        <div className={`popup${isActive ? ' popup_active' : ''}`}>
            <button className="popup__close-button" onClick={() => { onClose(false) }} />
            {popupType === 'character'
                ? <h2 className="popup__title">Add to <span className="popup__title-highlight">{rosterTitle}</span></h2>
                : <h2 className='popup__title'>Add your Guild</h2>
            }
            <form className="popup__form popup__form_type_character" name="form" onSubmit={onSubmit}>
                <div className="popup__inputs">
                    {popupType === 'character'
                        ? addCharacterInputs()
                        : addGuildInputs()
                    }
                </div>
                <button className="popup__submit-button" type="submit" disabled={isDisabled}>Submit</button>
            </form>
            {isToolTipOpen && currentToolTipArray.length >= 1 && <Tooltip array={currentToolTipArray} input={currentInputType} onClick={handleToolTipClick} onClose={setIsToolTipOpen} />}
        </div>
    )
}

export default AddPopup