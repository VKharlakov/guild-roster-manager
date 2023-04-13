import React from "react";
import Roster from "./Roster";
import AddCharacterPopup from "./AddCharacterPopup";
import api from "../utils/api";

function Raid({ isVisible }) {
    //Roster cards state arrays
    const [mainRosterCards, setMainRosterCards] = React.useState([])
    const [secondRosterCards, setSecondRosterCards] = React.useState([])

    //Show / Hide AddCharacterPopup states
    const [isMainRosterPopupActive, setIsMainRosterPopupActive] = React.useState(false)
    const [isSecondRosterPopupActive, setIsSecondRosterPopupActive] = React.useState(false)

    function resetPopupStates() {
        setIsMainRosterPopupActive(false)
        setIsSecondRosterPopupActive(false)
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
        <section className={`raid ${isVisible ? "" : "raid_hidden"}`}>
            <Roster
                cards={mainRosterCards}
                onAddCharacterPopup={setIsMainRosterPopupActive}
                resetPopupStates={resetPopupStates}
                title='Main Roster'
                onCardDelete={handleCardDelete}
                roster={mainRosterCards}
                rosterSetter={setMainRosterCards}
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
            <AddCharacterPopup
                isActive={isMainRosterPopupActive}
                onAddCard={handleAddCard}
                onClose={setIsMainRosterPopupActive}
                roster={mainRosterCards}
                rosterSetter={setMainRosterCards}
            />
            <AddCharacterPopup
                isActive={isSecondRosterPopupActive}
                onAddCard={handleAddCard}
                onClose={setIsSecondRosterPopupActive}
                roster={secondRosterCards}
                rosterSetter={setSecondRosterCards}
            />
        </section>
    )
}

export default Raid