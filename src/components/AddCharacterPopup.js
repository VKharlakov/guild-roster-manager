import React from "react";

function AddCharacterPopup({ onCardAdd, isActive, onClose, roster, rosterSetter }) {
    //Accumulating input values
    const [formValue, setFormValue] = React.useState({ realm: "", name: "", region: "eu" })

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
        setFormValue({ realm: "", name: "" })
        onClose(false)
    }

    return (
        <div className={`popup popup_type_add-card ${isActive ? 'popup_active' : ''}`}>
            <div className="popup__button-container">
                <button className="popup__button-close" onClick={() => { onClose(false) }}>&#128473;</button>
            </div>
            <form className="popup__form" name="form" onSubmit={handleSubmit}>
                <div className="popup__inputs">
                    <input className="popup__input popup__input_type_text popup__input_name_realm" value={formValue.realm} onChange={handleChange} name="realm" placeholder="Enter your realm" minLength="3" required />
                    <input className="popup__input popup__input_type_text popup__input_name_char" value={formValue.name} onChange={handleChange} name="name" placeholder="Enter your character name" minLength="3" required />
                </div>
                <button className="popup__submit-btn" type="submit">Submit</button>
                <div className="popup__tooltip-container popup__tooltip-container_type_realm popup__tooltip_hidden">
                    <ul className="popup__tooltip popup__tooltip_type_realm">
                        <template className="popup__tooltip-text-template">
                            <li className="popup__tooltip-text" data-text=""></li>
                        </template>
                    </ul>
                </div>
                <div className="popup__tooltip-container popup__tooltip-container_type_char popup__tooltip_hidden">
                    <ul className="popup__tooltip popup__tooltip_type_char">
                        <template className="popup__tooltip-text-template">
                            <li className="popup__tooltip-text" data-text=""></li>
                        </template>
                    </ul>
                </div>
            </form>
        </div>
    )
}

export default AddCharacterPopup