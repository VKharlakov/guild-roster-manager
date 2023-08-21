import './Popup.css'

function Popup({ errorPopupInfo, setIsErrorPopup, isActive }) {
    function onClose() {
        setIsErrorPopup(false)
    }

    return (
        <div className={`popup${isActive ? ' popup_active' : ''}`}>
            <div className='popup__container'>
                <button className='popup__close-button' onClick={() => onClose()} />
                <h2 className='popup__title'>{errorPopupInfo.title}</h2>
                <div className='popup__content'>
                    <p className='popup__text'>{errorPopupInfo.text}</p>
                </div>
                <button className='popup__button' onClick={() => onClose()}>{errorPopupInfo.buttonText}</button>
            </div>
        </div>
    )
}

export default Popup