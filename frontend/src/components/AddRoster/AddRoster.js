import './AddRoster.css'
import React from 'react'
import Preloader from '../Preloader/Preloader'

function AddRoster({ rosterType, guildData, handleAddRoster, isPreloader, isForm, setIsForm }) {
    const [formValue, setFormValue] = React.useState({ name: '', size: 20 })
    function handleChange(event) {
        const { name, value } = event.target

        //Rewriting input values
        setFormValue({
            ...formValue,
            [name]: value
        })
    }

    function onSubmit(event) {
        event.preventDefault()

        handleAddRoster({
            name: formValue.name,
            size: formValue.size,
            parentId: guildData._id
        })
    }

    function onClose() {
        setIsForm(false)
        setFormValue({ name: '', size: 20 })
    }

    React.useEffect(() => {
        setFormValue({ name: '', size: 20 })
    }, [isForm])

    return (
        <div className="add-roster">
            <button
                type="button"
                className="add-roster__button"
                onClick={() => setIsForm(true)}>
            </button>
            <form className={`add-roster__form add-roster__form_type_${rosterType}${isForm ? ' add-roster__form_active' : ''}`} onSubmit={(event) => onSubmit(event)}>
                <button className='add-roster__close-button' type='button' onClick={() => onClose()} />
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
                                    defaultChecked
                                />
                                <span className="add-roster__radio-input-custom" />
                            </label>
                            {/* <label className="add-roster__radio-label">
                                40
                                <input
                                    type="radio"
                                    name="size"
                                    className="add-roster__radio-input"
                                />
                                <span className="add-roster__radio-input-custom" />
                            </label> */}
                        </div>
                    </div>
                }
                <label className="add-roster__label">
                    Roster title
                    <input
                        className="add-roster__text-input"
                        type='text'
                        name='name'
                        placeholder='Enter roster title'
                        onChange={(event) => handleChange(event)}
                        value={formValue.name}
                        maxLength={30}
                        minLength={1}
                        required
                    />
                </label>
                <button className="add-roster__submit-button" type="submit">Submit</button>
            </form>
            <Preloader isActive={isPreloader} />
        </div>
    )
}

export default AddRoster