import './Popup.css'

function Popup({ popupInfo, setIsPopup, isActive }) {

    function onConfirm() {
        popupInfo.handleConfirm()
        setIsPopup(false)
    }

    // Close popup 
    function onClose() {
        setIsPopup(false)
    }

    return (
        <div className={`popup${isActive ? ' popup_active' : ''}`}>
            <div className='popup__container'>
                <button className='popup__close-button' onClick={() => onClose()} />
                <h2 className='popup__title'>{popupInfo.title}</h2>
                <div className='popup__content'>
                    <p className='popup__text'>{popupInfo.text}</p>
                </div>
                <div className='popup__button-container '>
                    <button className='popup__button' onClick={() => onClose()}>{popupInfo.buttonText}</button>
                    {popupInfo.title.toLowerCase().includes('sure') &&
                        <button className='popup__button popup__button_type_confirmation' onClick={() => onConfirm()}>Yes, I'm sure</button>
                    }
                </div>
            </div>
        </div>
    )
}

export default Popup