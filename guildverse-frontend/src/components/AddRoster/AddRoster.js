import './AddRoster.css'
import React from 'react'

function AddRoster({ rosterType }) {
    const [isFormActive, setIsFormActive] = React.useState(false)

    return (
        <div className="add-roster">
            <button
                type="button"
                className="add-roster__button"
                onClick={() => setIsFormActive(true)}>
            </button>
            <form className={`add-roster__form add-roster__form_type_${rosterType}${isFormActive ? ' add-roster__form_active' : ''}`}>
                <button className='add-roster__close-button' type='button' onClick={() => setIsFormActive(false)}/>
                {rosterType === 'raid' &&
                    <div className="add-roster__radio-container">
                        <label className="add-roster__radio-title">Group size</label>
                        <div className="add-roster__radio">
                            <label className="add-roster__radio-label">
                                20
                                <input
                                    type="radio"
                                    name="size"
                                    className="add-roster__radio-input"
                                />
                                <span className="add-roster__radio-input-custom" />
                            </label>
                            <label className="add-roster__radio-label">
                                40
                                <input
                                    type="radio"
                                    name="size"
                                    className="add-roster__radio-input"
                                />
                                <span className="add-roster__radio-input-custom" />
                            </label>
                        </div>
                    </div>
                }
                <label className="add-roster__label">
                    Roster title
                    <input
                        className="add-roster__text-input"
                        type='text'
                        name='title'
                        placeholder='Enter roster title'
                    />
                </label>
                <button
                    className="add-roster__submit-button"
                    type="button"
                    onClick={() => setIsFormActive(false)}
                >Submit</button>
            </form>
        </div>
    )
}

export default AddRoster