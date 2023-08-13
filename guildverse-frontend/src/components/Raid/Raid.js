import React from "react";
import './Raid.css'
import Roster from "../Roster/Roster";
import AddCharacterPopup from "../Popup/AddCharacterPopup";

function Raid({ onCardDelete, onCardAdd, sectionType }) {
    //Roster cards state arrays
    const [mainRosterCards, setMainRosterCards] = React.useState([])
    const [secondRosterCards, setSecondRosterCards] = React.useState([])

    //Show / Hide AddCharacterPopup states
    const [isMainRosterPopupActive, setIsMainRosterPopupActive] = React.useState(false)
    const [isSecondRosterPopupActive, setIsSecondRosterPopupActive] = React.useState(false)

    //Close all popups
    function resetPopupStates() {
        setIsMainRosterPopupActive(false)
        setIsSecondRosterPopupActive(false)
    }

    return (
        <section className="raid">
            <Roster
                onAddCharacterPopup={setIsMainRosterPopupActive}
                resetPopupStates={resetPopupStates}
                title='Main Roster'
                onCardDelete={onCardDelete}
                roster={mainRosterCards}
                rosterSetter={setMainRosterCards}
                rosterType={sectionType}
                rosterMaxLength='20'
            />
            <Roster
                onAddCharacterPopup={setIsSecondRosterPopupActive}
                resetPopupStates={resetPopupStates}
                title='Second Group'
                onCardDelete={onCardDelete}
                roster={secondRosterCards}
                rosterSetter={setSecondRosterCards}
                rosterType={sectionType}
                rosterMaxLength='20'
            />
            <AddCharacterPopup
                isActive={isMainRosterPopupActive}
                onCardAdd={onCardAdd}
                onClose={setIsMainRosterPopupActive}
                roster={mainRosterCards}
                rosterSetter={setMainRosterCards}
                rosterMaxLength='20'
                rosterTitle={'Main Roster'}
            />
            <AddCharacterPopup
                isActive={isSecondRosterPopupActive}
                onCardAdd={onCardAdd}
                onClose={setIsSecondRosterPopupActive}
                roster={secondRosterCards}
                rosterSetter={setSecondRosterCards}
                rosterMaxLength='20'
                rosterTitle={'Second Group'}
            />
        </section>
    )
}

export default Raid