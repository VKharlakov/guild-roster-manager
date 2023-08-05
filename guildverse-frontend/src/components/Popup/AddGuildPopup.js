import './Popup.css'

function AddGuildPopup({ isActive, onClose }) {
    return (
        <div className={`popup popup_type_add-card ${isActive ? 'popup_active' : ''}`}>
            <button className="popup__button-close" onClick={() => { onClose(false) }}>&#128473;</button>
            <form className="popup__form" name="form" >
                <div className='popup__radio-container'>
                    <label htmlFor='eu' className='popup__radio-label'>
                        EU
                        <input className='popup__radio' type='radio' name='region' id='eu' defaultChecked />
                        <span className='popup__custom-radio' />
                    </label>
                    <label htmlFor='us' className='popup__radio-label'>
                        US
                        <input className='popup__radio' type='radio' name='region' id='us' />
                        <span className='popup__custom-radio' />
                    </label>
                </div>
                <input
                    onFocus={() => { }}
                    onChange={(event) => { }}
                    className="popup__input popup__input_type_text"
                    name="realm"
                    placeholder="Enter guild realm"
                    minLength="3"
                    required
                    autoComplete="off"
                />
                <input
                    onFocus={() => { }}
                    onChange={(event) => { }}
                    className="popup__input popup__input_type_text"
                    name="name"
                    placeholder="Enter guild name"
                    minLength="3"
                    required
                    autoComplete="off"
                />
                <button className="popup__submit-btn" type="submit" >Add guild</button>
            </form >
            {/* {isToolTipOpen && currentToolTipArray.length >= 1 && <ToolTip array={currentToolTipArray} input={currentInputType} onClick={handleToolTipClick} onClose={setIsToolTipOpen}/>} */}
        </div >
    )
}

export default AddGuildPopup