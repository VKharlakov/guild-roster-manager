import React from "react";
import Roster from "./Roster";
import AddCharacterPopup from "./AddCharacterPopup";

function MythicPlus({ onCardDelete, onCardAdd, sectionType }) {
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
        <section className={`section section_type_${sectionType}`}>
            <Roster
                title='First Group'
                cards={firstRosterCards}
                onAddCharacterPopup={setIsFirstRosterPopupActive}
                resetPopupStates={resetPopupStates}
                onCardDelete={onCardDelete}
                roster={firstRosterCards}
                rosterSetter={setFirstRosterCards}
                rosterType={sectionType}
            />
            <Roster
                title='Second Group'
                cards={secondRosterCards}
                onAddCharacterPopup={setIsSecondRosterPopupActive}
                resetPopupStates={resetPopupStates}
                onCardDelete={onCardDelete}
                roster={secondRosterCards}
                rosterSetter={setSecondRosterCards}
                rosterType={sectionType}
            />
            <Roster
                title='Third Group'
                cards={thirdRosterCards}
                onAddCharacterPopup={setIsThirdRosterPopupActive}
                resetPopupStates={resetPopupStates}
                onCardDelete={onCardDelete}
                roster={thirdRosterCards}
                rosterSetter={setThirdRosterCards}
                rosterType={sectionType}
            />
            <Roster
                title='Fourth Group'
                cards={fourthRosterCards}
                onAddCharacterPopup={setIsFourthRosterPopupActive}
                resetPopupStates={resetPopupStates}
                onCardDelete={onCardDelete}
                roster={fourthRosterCards}
                rosterSetter={setFourthRosterCards}
                rosterType={sectionType}
            />
            <Roster
                title='Fifth Group'
                cards={fifthRosterCards}
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
            />
            <AddCharacterPopup
                isActive={isSecondRosterPopupActive}
                onClose={setIsSecondRosterPopupActive}
                onCardAdd={onCardAdd}
                roster={secondRosterCards}
                rosterSetter={setSecondRosterCards}
            />
            <AddCharacterPopup
                isActive={isThirdRosterPopupActive}
                onClose={setIsThirdRosterPopupActive}
                onCardAdd={onCardAdd}
                roster={thirdRosterCards}
                rosterSetter={setThirdRosterCards}
            />
            <AddCharacterPopup
                isActive={isFourthRosterPopupActive}
                onClose={setIsFourthRosterPopupActive}
                onCardAdd={onCardAdd}
                roster={fourthRosterCards}
                rosterSetter={setFourthRosterCards}
            />
            <AddCharacterPopup
                isActive={isFifthRosterPopupActive}
                onClose={setIsFifthRosterPopupActive}
                onCardAdd={onCardAdd}
                roster={fifthRosterCards}
                rosterSetter={setFifthRosterCards}
            />
        </section>
    )
}

export default MythicPlus