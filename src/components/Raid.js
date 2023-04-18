import React from "react";
import Roster from "./Roster";
import AddCharacterPopup from "./AddCharacterPopup";

function Raid({ onCardDelete, onCardAdd, sectionType, activeGuildData }) {
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
        <section className={`section section_type_${sectionType}`}>
            <Roster
                onAddCharacterPopup={setIsMainRosterPopupActive}
                resetPopupStates={resetPopupStates}
                title='Main Roster'
                onCardDelete={onCardDelete}
                roster={mainRosterCards}
                rosterSetter={setMainRosterCards}
                rosterType={sectionType}
            />
            <Roster
                onAddCharacterPopup={setIsSecondRosterPopupActive}
                resetPopupStates={resetPopupStates}
                title='Second Group'
                onCardDelete={onCardDelete}
                roster={secondRosterCards}
                rosterSetter={setSecondRosterCards}
                rosterType={sectionType}
            />
            <AddCharacterPopup
                isActive={isMainRosterPopupActive}
                onCardAdd={onCardAdd}
                onClose={setIsMainRosterPopupActive}
                roster={mainRosterCards}
                rosterSetter={setMainRosterCards}
                rosterMaxLength='20'
                members={activeGuildData}
            />
            <AddCharacterPopup
                isActive={isSecondRosterPopupActive}
                onCardAdd={onCardAdd}
                onClose={setIsSecondRosterPopupActive}
                roster={secondRosterCards}
                rosterSetter={setSecondRosterCards}
                rosterMaxLength='20'
                members={activeGuildData}
            />
        </section>
    )
}

export default Raid