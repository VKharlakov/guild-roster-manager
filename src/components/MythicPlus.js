import React from "react";
import Roster from "./Roster";
import api from "../utils/api";
import AddCharacterPopup from "./AddCharacterPopup";

function MythicPlus({ isVisible }) {
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

    //Add characters to Roster(s)
    function handleAddCard(cardData, roster, rosterSetter) {
        api.getCharacterData(cardData)
            .then((res) => {
                rosterSetter([res, ...roster])
            })
    }

    //Delete character from a roster
    function handleCardDelete(roster, rosterSetter, id) {
        rosterSetter(roster.filter(card => roster.indexOf(card) !== id))
    }

    return (
        <section className={`M ${isVisible ? "" : "M_hidden"}`}>
            <Roster
                cards={firstRosterCards}
                onAddCharacterPopup={setIsFirstRosterPopupActive}
                resetPopupStates={resetPopupStates}
                title='First Group'
                onCardDelete={handleCardDelete}
                roster={firstRosterCards}
                rosterSetter={setFirstRosterCards}
            />
            <Roster
                cards={secondRosterCards}
                onAddCharacterPopup={setIsSecondRosterPopupActive}
                resetPopupStates={resetPopupStates}
                title='Second Group'
                onCardDelete={handleCardDelete}
                roster={secondRosterCards}
                rosterSetter={setSecondRosterCards}
            />
            <Roster
                cards={thirdRosterCards}
                onAddCharacterPopup={setIsThirdRosterPopupActive}
                resetPopupStates={resetPopupStates}
                title='Third Group'
                onCardDelete={handleCardDelete}
                roster={thirdRosterCards}
                rosterSetter={setThirdRosterCards}
            />
            <Roster
                cards={fourthRosterCards}
                onAddCharacterPopup={setIsFourthRosterPopupActive}
                resetPopupStates={resetPopupStates}
                title='Fourth Group'
                onCardDelete={handleCardDelete}
                roster={fourthRosterCards}
                rosterSetter={setFourthRosterCards}
            />
            <Roster
                cards={fifthRosterCards}
                onAddCharacterPopup={setIsFifthRosterPopupActive}
                resetPopupStates={resetPopupStates}
                title='Fifth Group'
                onCardDelete={handleCardDelete}
                roster={fifthRosterCards}
                rosterSetter={setFifthRosterCards}
            />
            <AddCharacterPopup
                isActive={isFirstRosterPopupActive}
                onAddCard={handleAddCard}
                onClose={setIsFirstRosterPopupActive}
                roster={firstRosterCards}
                rosterSetter={setFirstRosterCards}
            />
            <AddCharacterPopup
                isActive={isSecondRosterPopupActive}
                onAddCard={handleAddCard}
                onClose={setIsSecondRosterPopupActive}
                roster={secondRosterCards}
                rosterSetter={setSecondRosterCards}
            />
            <AddCharacterPopup
                isActive={isThirdRosterPopupActive}
                onAddCard={handleAddCard}
                onClose={setIsThirdRosterPopupActive}
                roster={thirdRosterCards}
                rosterSetter={setThirdRosterCards}
            />
            <AddCharacterPopup
                isActive={isFourthRosterPopupActive}
                onAddCard={handleAddCard}
                onClose={setIsFourthRosterPopupActive}
                roster={fourthRosterCards}
                rosterSetter={setFourthRosterCards}
            />
            <AddCharacterPopup
                isActive={isFifthRosterPopupActive}
                onAddCard={handleAddCard}
                onClose={setIsFifthRosterPopupActive}
                roster={fifthRosterCards}
                rosterSetter={setFifthRosterCards}
            />
        </section>
    )
}

export default MythicPlus