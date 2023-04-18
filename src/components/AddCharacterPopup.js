import React from "react";
import { euServerList as servers } from "../utils/constants";
import ToolTip from "./ToolTip";

function AddCharacterPopup({ onCardAdd, isActive, onClose, roster, rosterSetter, rosterMaxLength, members }) {
    //Accumulating input values
    const [formValue, setFormValue] = React.useState({ realm: "", name: "", region: "eu" })

    //Disable button state
    const [isDisabled, setIsDisabled] = React.useState(false)

    //ToolTip-related states
    const [isToolTipOpen, setIsToolTipOpen] = React.useState(false)
    const [currentToolTipArray, setCurrentToolTipArray] = React.useState('')
    const memberList = members.active_members.map((member) => member.character)

    //Function when an input is focused
    function onInputFocus(toolTipArray) {
        setIsToolTipOpen(true)
        setCurrentToolTipArray(toolTipArray)
    }

    //Function that searches for matching names from array
    function search(value, toolTipArray) {
        setCurrentToolTipArray(toolTipArray.filter(item => item.name.toLowerCase().startsWith(value.toLowerCase())))
    }

    //Function when typing inside of an input
    function onChange(e, toolTipArray) {
        const { name, value } = e.target
        //Searching for matching items
        search(value, toolTipArray)

        //Rewriting input values
        setFormValue({
            ...formValue,
            region: 'eu',
            [name]: value
        })
    }

    //Function when Submit
    function onSubmit(e) {
        e.preventDefault()

        onCardAdd(formValue, roster, rosterSetter)
        // setFormValue({ realm: "", name: "" })
        // onClose(false)
    }

    React.useEffect(() => {

        //Prevent from overflowing roster; check if it hit max amount of characters
        if (roster.length >= rosterMaxLength) {
            setIsDisabled(true)
        } else {
            setIsDisabled(false)
        }

    }, [roster])

    return (
        <div className={`popup popup_type_add-card ${isActive ? 'popup_active' : ''}`}>
            <div className="popup__button-container">
                <button className="popup__button-close" onClick={() => { onClose(false) }}>&#128473;</button>
            </div>
            <form className="popup__form" name="form" onSubmit={onSubmit}>
                <div className="popup__inputs">
                    <input
                        onFocus={() => { onInputFocus(servers) }}
                        onBlur={() => { setIsToolTipOpen(false) }}
                        onChange={(event) => { onChange(event, servers) }}
                        className="popup__input popup__input_type_text"
                        name="realm"
                        placeholder="Enter your realm"
                        value={formValue.realm}
                        minLength="3"
                        required
                    />
                    <input
                        onFocus={() => { onInputFocus(memberList) }}
                        onBlur={() => { setIsToolTipOpen(false) }}
                        onChange={(event) => { onChange(event, memberList) }}
                        className="popup__input popup__input_type_text"
                        name="name"
                        placeholder="Enter your character name"
                        value={formValue.name}
                        minLength="3"
                        required
                    />
                </div>
                <button className="popup__submit-btn" type="submit" disabled={isDisabled}>Submit</button>
            </form>
            {isToolTipOpen && <ToolTip array={currentToolTipArray} />}
        </div>
    )
}

export default AddCharacterPopup