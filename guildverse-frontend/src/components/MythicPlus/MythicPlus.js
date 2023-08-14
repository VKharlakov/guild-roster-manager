import React from "react";
import './MythicPlus.css'
import Roster from "../Roster/Roster";
import AddPopup from "../AddPopup/AddPopup";
import AddRoster from "../AddRoster/AddRoster";

function MythicPlus({ onCardDelete, onCardAdd, sectionType, activeGuildData, rosterMaxAmount }) {
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

    const [rosterList, setRosterList] = React.useState([])

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
                rosterMaxLength='5'
            />
            <Roster
                title='Second Group'
                onAddCharacterPopup={setIsSecondRosterPopupActive}
                resetPopupStates={resetPopupStates}
                onCardDelete={onCardDelete}
                roster={secondRosterCards}
                rosterSetter={setSecondRosterCards}
                rosterType={sectionType}
                rosterMaxLength='5'
            />
            <Roster
                title='Third Group'
                onAddCharacterPopup={setIsThirdRosterPopupActive}
                resetPopupStates={resetPopupStates}
                onCardDelete={onCardDelete}
                roster={thirdRosterCards}
                rosterSetter={setThirdRosterCards}
                rosterType={sectionType}
                rosterMaxLength='5'
            />
            <Roster
                title='Fourth Group'
                onAddCharacterPopup={setIsFourthRosterPopupActive}
                resetPopupStates={resetPopupStates}
                onCardDelete={onCardDelete}
                roster={fourthRosterCards}
                rosterSetter={setFourthRosterCards}
                rosterType={sectionType}
                rosterMaxLength='5'
            />
            <Roster
                title='Fifth Group'
                onAddCharacterPopup={setIsFifthRosterPopupActive}
                resetPopupStates={resetPopupStates}
                onCardDelete={onCardDelete}
                roster={fifthRosterCards}
                rosterSetter={setFifthRosterCards}
                rosterType={sectionType}
                rosterMaxLength='5'
            />
            {rosterList.length < rosterMaxAmount &&
                <AddRoster
                    rosterType={sectionType}
                />
            }
            <AddPopup
                isActive={isFirstRosterPopupActive}
                onClose={setIsFirstRosterPopupActive}
                onCardAdd={onCardAdd}
                roster={firstRosterCards}
                rosterSetter={setFirstRosterCards}
                rosterMaxLength='5'
                rosterTitle={'First Group'}
                popupType='character'
            />
            <AddPopup
                isActive={isSecondRosterPopupActive}
                onClose={setIsSecondRosterPopupActive}
                onCardAdd={onCardAdd}
                roster={secondRosterCards}
                rosterSetter={setSecondRosterCards}
                rosterMaxLength='5'
                rosterTitle={'Second Group'}
                popupType='character'
            />
            <AddPopup
                isActive={isThirdRosterPopupActive}
                onClose={setIsThirdRosterPopupActive}
                onCardAdd={onCardAdd}
                roster={thirdRosterCards}
                rosterSetter={setThirdRosterCards}
                rosterMaxLength='5'
                rosterTitle={'Third Group'}
                popupType='character'
            />
            <AddPopup
                isActive={isFourthRosterPopupActive}
                onClose={setIsFourthRosterPopupActive}
                onCardAdd={onCardAdd}
                roster={fourthRosterCards}
                rosterSetter={setFourthRosterCards}
                rosterMaxLength='5'
                rosterTitle={'Fourth Group'}
                popupType='character'
            />
            <AddPopup
                isActive={isFifthRosterPopupActive}
                onClose={setIsFifthRosterPopupActive}
                onCardAdd={onCardAdd}
                roster={fifthRosterCards}
                rosterSetter={setFifthRosterCards}
                rosterMaxLength='5'
                rosterTitle={'Fifth Group'}
                popupType='character'
            />
        </section>
    )
}

export default MythicPlus