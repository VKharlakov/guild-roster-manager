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

    //Add cards to Roster(s)
    function handleAddMainRosterCard(cardData) {
        api.getCharacterData(cardData)
        .then((res) => {
            setMainRosterCards([res, ...mainRosterCards])
            console.log(res)
            console.log("MainRosterCards:", mainRosterCards)
        })
    }

    function handleAddSecondRosterCard(cardData) {
        api.getCharacterData(cardData)
        .then((res) => {
            setSecondRosterCards([res, ...secondRosterCards])
            console.log("SecondRosterCards:", secondRosterCards)
        })
    }

    return (
        <section className={`raid ${isVisible ? "" : "raid_hidden"}`}>
            <Roster
                cards={mainRosterCards}
                onAddCharacterPopup={setIsMainRosterPopupActive}
                resetPopupStates={resetPopupStates}
                title='Main Roster'
            />
            <Roster
                cards={secondRosterCards}
                onAddCharacterPopup={setIsSecondRosterPopupActive}
                resetPopupStates={resetPopupStates}
                title='Second Group'
            />
            <AddCharacterPopup
                isActive={isMainRosterPopupActive}
                onAddCard={handleAddMainRosterCard}
                closeOnSubmit={setIsMainRosterPopupActive}
            />
            <AddCharacterPopup
                isActive={isSecondRosterPopupActive}
                onAddCard={handleAddSecondRosterCard}
                closeOnSubmit={setIsSecondRosterPopupActive}
            />
        </section>
    )
}

export default Raid