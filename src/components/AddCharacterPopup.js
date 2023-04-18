import React from "react";
import { euServerList as servers} from "../utils/constants";
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

    //Handler when an input if focused
    function onInputFocus(toolTipArray) {
        setIsToolTipOpen(true)
        setCurrentToolTipArray(toolTipArray)
    }
    
    //Rewriting input values
    function handleChange(e) {
        const { name, value } = e.target

        setFormValue({
            ...formValue,
            region: 'eu',
            [name]: value
        })
    }

    //Submit handler
    function handleSubmit(e) {
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
            <form className="popup__form" name="form" onSubmit={handleSubmit}>
                <div className="popup__inputs">
                    <input className="popup__input popup__input_type_text popup__input_name_realm" onFocus={() => {onInputFocus(servers)}} onBlur={() => {setIsToolTipOpen(false)}} value={formValue.realm} onChange={handleChange} name="realm" placeholder="Enter your realm" minLength="3" required />
                    <input className="popup__input popup__input_type_text popup__input_name_char"  onFocus={() => {onInputFocus(memberList)}} onBlur={() => {setIsToolTipOpen(false)}} value={formValue.name} onChange={handleChange} name="name" placeholder="Enter your character name" minLength="3" required />
                </div>
                <button className="popup__submit-btn" type="submit" disabled={isDisabled}>Submit</button>
            </form>
            {isToolTipOpen && <ToolTip array={currentToolTipArray} />}
        </div>
    )
}

export default AddCharacterPopup