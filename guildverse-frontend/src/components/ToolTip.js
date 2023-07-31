import React from "react";

function ToolTip({array, input, onClick, onClose}) {
    function handleClick(inputValue) {
        onClick(input, inputValue)
        onClose(false)
    }

    const ref = React.useRef(null)

    function handleClickOutside(event) {
        if (!ref.current.contains(event.target) && event.target.tagName !== 'INPUT') {
            onClose(false)
        }
    }

    React.useEffect(() => {
        document.addEventListener('click', handleClickOutside, true)

        return () => {document.removeEventListener('click', handleClickOutside, true)}
    }, [])

    return (
        <div className="popup__tooltip-container" ref={ref}>
            <ul className="popup__tooltip">
                {array.map((item, index) => (
                    <li className="popup__tooltip-text" onClick={() => {handleClick(item.name)}} key={index}>{item.name}</li>
                ))}
            </ul>
        </div>
    )
}

export default ToolTip