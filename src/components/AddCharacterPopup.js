import React from "react";

function AddCharacterPopup() {
    return (
        <div className="popup" id="raid-one-popup">
            <form className="popup__form" name="form">
                <div className="popup__radio">
                    <input className="popup__input popup__input_type_radio" type="radio" id="radio-us" name="region" value="us" required />
                    <label className="popup__radio-label" for="radio-us">US</label>
                    <input className="popup__input popup__input_type_radio" checked="checked" type="radio" id="radio-eu" name="region" value="eu" required />
                    <label className="popup__radio-label" for="radio-eu">Europe</label>
                </div>
                <div className="popup__inputs">
                    <input className="popup__input popup__input_type_text popup__input_name_realm" type="text" id="realm" name="realm" placeholder="Enter your realm" minlength="3" required />
                    <input className="popup__input popup__input_type_text popup__input_name_char" type="text" name="name" placeholder="Enter your character name" minlength="3" required />
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