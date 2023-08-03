import React from "react";
import './MythicPlus.css'
import Roster from "../Roster/Roster";
import AddCharacterPopup from "../Popup/AddCharacterPopup";

function MythicPlus({ onCardDelete, onCardAdd, sectionType, activeGuildData }) {
    //Roster cards state arrays
    const [firstRosterCards, setFirstRosterCards] = React.useState([])
    const [secondRosterCards, setSecondRosterCards] = React.useState([])
    const [thirdRosterCards, setThirdRosterCards] = React.useState([])
    const [fourthRosterCards, setFourthRosterCards] = React.useState([])
    const [fifthRosterCards, setFifthRosterCards] = React.useState([])

    //Show / Hide AddCharacterPopup states
    const [isFirstRosterPopupActive, setIsFirstRosterPopupActive] = React.useState(false)
    const [isSecondRosterPopupActive, setIsSecondRosterPopupActive] = React.useState(false)
    const [isThirdRosterPopupActive, setIsThirdRosterPopupActive] = React.useState(false)
    const [isFourthRosterPopupActive, setIsFourthRosterPopupActive] = React.useState(false)
    const [isFifthRosterPopupActive, setIsFifthRosterPopupActive] = React.useState(false)

    function resetPopupStates() {
        setIsFirstRosterPopupActive(false)
        setIsSecondRosterPopupActive(false)
        setIsThirdRosterPopupActive(false)
        setIsFourthRosterPopupActive(false)
        setIsFifthRosterPopupActive(false)
    }

    return (
        <section className="mythic-plus">
            <Roster
                title='First Group'
                onAddCharacterPopup={setIsFirstRosterPopupActive}
                resetPopupStates={resetPopupStates}
                onCardDelete={onCardDelete}
                roster={firstRosterCards}
                rosterSetter={setFirstRosterCards}
                rosterType={sectionType}
            />
            <Roster
                title='Second Group'
                onAddCharacterPopup={setIsSecondRosterPopupActive}
                resetPopupStates={resetPopupStates}
                onCardDelete={onCardDelete}
                roster={secondRosterCards}
                rosterSetter={setSecondRosterCards}
                rosterType={sectionType}
            />
            <Roster
                title='Third Group'
                onAddCharacterPopup={setIsThirdRosterPopupActive}
                resetPopupStates={resetPopupStates}
                onCardDelete={onCardDelete}
                roster={thirdRosterCards}
                rosterSetter={setThirdRosterCards}
                rosterType={sectionType}
            />
            <Roster
                title='Fourth Group'
                onAddCharacterPopup={setIsFourthRosterPopupActive}
                resetPopupStates={resetPopupStates}
                onCardDelete={onCardDelete}
                roster={fourthRosterCards}
                rosterSetter={setFourthRosterCards}
                rosterType={sectionType}
            />
            <Roster
                title='Fifth Group'
                onAddCharacterPopup={setIsFifthRosterPopupActive}
                resetPopupStates={resetPopupStates}
                onCardDelete={onCardDelete}
                roster={fifthRosterCards}
                rosterSetter={setFifthRosterCards}
                rosterType={sectionType}
            />
            <AddCharacterPopup
                isActive={isFirstRosterPopupActive}
                onClose={setIsFirstRosterPopupActive}
                onCardAdd={onCardAdd}
                roster={firstRosterCards}
                rosterSetter={setFirstRosterCards}
                rosterMaxLength='5'
                rosterTitle={'First Group'}
            />
            <AddCharacterPopup
                isActive={isSecondRosterPopupActive}
                onClose={setIsSecondRosterPopupActive}
                onCardAdd={onCardAdd}
                roster={secondRosterCards}
                rosterSetter={setSecondRosterCards}
                rosterMaxLength='5'
                rosterTitle={'Second Group'}
            />
            <AddCharacterPopup
                isActive={isThirdRosterPopupActive}
                onClose={setIsThirdRosterPopupActive}
                onCardAdd={onCardAdd}
                roster={thirdRosterCards}
                rosterSetter={setThirdRosterCards}
                rosterMaxLength='5'
                rosterTitle={'Third Group'}
            />
            <AddCharacterPopup
                isActive={isFourthRosterPopupActive}
                onClose={setIsFourthRosterPopupActive}
                onCardAdd={onCardAdd}
                roster={fourthRosterCards}
                rosterSetter={setFourthRosterCards}
                rosterMaxLength='5'
                rosterTitle={'Fourth Group'}
            />
            <AddCharacterPopup
                isActive={isFifthRosterPopupActive}
                onClose={setIsFifthRosterPopupActive}
                onCardAdd={onCardAdd}
                roster={fifthRosterCards}
                rosterSetter={setFifthRosterCards}
                rosterMaxLength='5'
                rosterTitle={'Fifth Group'}
            />
        </section>
    )
}

export default MythicPlus