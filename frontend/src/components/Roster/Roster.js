import "./Roster.css";
import React from "react";
import Preloader from "../Preloader/Preloader";
import Character from "../Character/Character";
import RostersSkeleton from "./RostersSkeleton/RostersSkeleton";
import RosterInfoPanel from "../RosterInfoPanel/RosterInfoPanel";
import { compareByRole, countAverage, countRoles } from "../../utils/utils";

function Roster({
  name,
  size,
  rosterId,
  guildData,
  characters,
  rosterType,
  isAddPopup,
  addPopupInfo,
  setIsAddPopup,
  setAddPopupInfo,
  isUpdatingRoster,
  isAddingCharacter,
  isRosterPreloader,
  handleDeleteRoster,
  handleDeleteCharacter,
  setPopupInfo,
  setIsPopup,
}) {
  const [ilvl, setIlvl] = React.useState(0);
  const [raiting, setRaiting] = React.useState(0); //M+ rating state
  const [roles, setRoles] = React.useState({
    tanks: 0,
    healers: 0,
    dps: 0,
    total: 0,
  }); //Raid role counter state
  const [characterList, setCharacterList] = React.useState(characters); //Characters array state
  const [isPreloader, setIsPreloader] = React.useState(isRosterPreloader); //Preloader state

  //Handle add roles to roles array
  function handleSetRoles() {
    setRoles({
      tanks: countRoles(characters, "tank"),
      healers: countRoles(characters, "healing"),
      dps: countRoles(characters, "dps"),
      total: characters.length,
    });
  }

  //Handle add raiting score to raiting state
  function handleSetRaiting() {
    setRaiting(countAverage(characters, "mythicPlusRaiting"));
  }

  // Delete roster click
  function onDeleteRoster() {
    setIsPopup(true);
    setPopupInfo({
      title: "Are you sure?",
      text: `You are deleting a "${name}" roster. This action would be irreversible. Do you want to proceed?`,
      buttonText: "No",
      handleConfirm: () =>
        handleDeleteRoster({
          _id: rosterId,
          parentId: guildData._id,
        }),
    });
  }

  // Add character click
  function onAddCharacter() {
    // If a popup is already open, then "close" and reopen
    if (isAddPopup && addPopupInfo.rosterName !== name) {
      setIsAddPopup(false);
      setTimeout(() => {
        setIsAddPopup(true);
        setAddPopupInfo({
          rosterId: rosterId,
          rosterName: name,
          rosterSize: size,
        });
      }, 200);
    } else {
      setIsAddPopup(true);
      setAddPopupInfo({
        rosterId: rosterId,
        rosterName: name,
        rosterSize: size,
      });
    }
  }

  // Canceling Preloader if an error occures while deleting
  React.useEffect(() => {
    setIsPreloader(isRosterPreloader);
  }, [isRosterPreloader]);

  React.useEffect(() => {
    setIlvl(countAverage(characters, "ilvl"));
    setCharacterList(characters);
  }, [characters]);

  React.useEffect(() => {
    setIsPreloader(isUpdatingRoster);
  }, [isUpdatingRoster]);

  return (
    <div className={`roster roster_type_${rosterType}`}>
      <h2 className="roster__title">{name}</h2>
      {ilvl !== 0 && !isNaN(ilvl) && (
        <div className="roster__note-container">
          <p className="roster__ilvl">{`ilvl: ${ilvl}`}</p>
        </div>
      )}
      <button
        className="roster__delete-button"
        onClick={() => onDeleteRoster()}
      />
      <ul className="roster__characters">
        {characterList.sort(compareByRole).map((character) => (
          <Character
            key={character._id}
            character={character}
            parentId={rosterId}
            handleDeleteCharacter={handleDeleteCharacter}
          />
        ))}
        {isAddingCharacter && isUpdatingRoster && <RostersSkeleton />}
        {characterList.length < size && !isAddingCharacter && (
          <button
            className="roster__add-character-button"
            onClick={() => onAddCharacter()}
          />
        )}
      </ul>
      {rosterType === "raid" && (
        <RosterInfoPanel
          counter={handleSetRoles}
          array={roles}
          rosterType={rosterType}
          roster={characters}
        ></RosterInfoPanel>
      )}
      {rosterType === "mythic-plus" && (
        <RosterInfoPanel
          counter={handleSetRaiting}
          array={raiting}
          rosterType={rosterType}
          roster={characters}
        ></RosterInfoPanel>
      )}
      <Preloader isActive={isPreloader} />
    </div>
  );
}

export default Roster;
