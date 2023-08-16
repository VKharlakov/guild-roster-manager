import React from "react";
import './Raid.css'
import Roster from "../Roster/Roster";
import AddPopup from "../AddPopup/AddPopup";
import AddRoster from "../AddRoster/AddRoster";

function Raid({ onCardDelete, onCardAdd, sectionType, rosterMaxAmount }) {
    //Roster cards state arrays
    const [mainRosterCards, setMainRosterCards] = React.useState([])
    const [secondRosterCards, setSecondRosterCards] = React.useState([])

    //Show / Hide AddCharacterPopup states
    const [isMainRosterPopupActive, setIsMainRosterPopupActive] = React.useState(false)
    const [isSecondRosterPopupActive, setIsSecondRosterPopupActive] = React.useState(false)

    const [rosterList, setRosterList] = React.useState([])

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
            <Roster
                onAddCharacterPopup={setIsSecondRosterPopupActive}
                resetPopupStates={resetPopupStates}
                title='Reset Group'
                onCardDelete={onCardDelete}
                roster={secondRosterCards}
                rosterSetter={setSecondRosterCards}
                rosterType={sectionType}
                rosterMaxLength='20'
            />
            {rosterList.length < rosterMaxAmount &&
                <AddRoster
                    rosterType={sectionType}
                />
            }
            <AddPopup
                isActive={isMainRosterPopupActive}
                onCardAdd={onCardAdd}
                onClose={setIsMainRosterPopupActive}
                roster={mainRosterCards}
                rosterSetter={setMainRosterCards}
                rosterMaxLength='20'
                rosterTitle={'Main Roster'}
                popupType='character'
            />
            <AddPopup
                isActive={isSecondRosterPopupActive}
                onCardAdd={onCardAdd}
                onClose={setIsSecondRosterPopupActive}
                roster={secondRosterCards}
                rosterSetter={setSecondRosterCards}
                rosterMaxLength='20'
                rosterTitle={'Second Group'}
                popupType='character'
            />
        </section>
    )
}

export default Raid