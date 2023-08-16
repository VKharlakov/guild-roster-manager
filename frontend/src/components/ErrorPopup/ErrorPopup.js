import './ErrorPopup.css'
import React from "react";

function ErrorPopup({ isOpen, errorText, onClose }) {
    function handleClose() {
        onClose(false)
    }

    const ref = React.useRef(null)

    React.useEffect(() => {
        if (!isOpen) {
            return
        }

        function handleEscClose(event) {
            if (event.key === 'Escape') {
                onClose(false)
            }
        }

        function handleClickOutside(event) {
            if (!ref.current.contains(event.target)) {
                onClose(false)
            }
        }

        document.addEventListener('keydown', handleEscClose)
        document.addEventListener('click', handleClickOutside)

        return () => {
            document.removeEventListener('keydown', handleEscClose)
            document.removeEventListener('click', handleClickOutside)
        }

    }, [isOpen])

    return (
        <div className={`error-popup ${isOpen ? '' : 'error-popup_hidden'}`}>
            <div className="error-container" ref={ref}>
                <h2 className="error-popup__title">Error</h2>
                <p className="error-popup__text">{errorText || `An unknown error has occured.`}</p>
                <button className="error-popup__button" onClick={handleClose}>{'Ok ;('}</button>
            </div>
        </div>
    )
}

export default ErrorPopup