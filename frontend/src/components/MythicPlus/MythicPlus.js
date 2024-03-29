import "./MythicPlus.css";
import React from "react";
import Roster from "../Roster/Roster";
import AddPopup from "../AddPopup/AddPopup";
import AddRoster from "../AddRoster/AddRoster";
import { useOutletContext } from "react-router-dom";
import MythicPlusSkeleton from "./MythicPlusSkeleton/MythicPlusSkeleton";

// Api imports
import guildRMApi from "../../utils/guildRMApi";
import raiderIoApi from "../../utils/raiderIoApi";

function MythicPlus({
  sectionType,
  rosterMaxAmount,
  setIsPopup,
  setPopupInfo,
}) {
  const [isForm, setIsForm] = React.useState(false); //Add roster form state
  const [isPageLoading, setIsPageLoading] = React.useState(false); //Show "skeletons" upon loading the page
  const [isUpdatingRoster, setIsUpdatingRoster] = React.useState(null); //Preloader state for updating roster (?)
  const [isAddingCharacter, setIsAddingCharacter] = React.useState(false); //Show "skeleton" when adding a new character
  const [isRosterPreloader, setIsRosterPreloader] = React.useState(false); //Preloader state for roster loading
  const [isAddRosterPreloader, setAddRosterIsPreloader] = React.useState(false); //Preloader state for add-form loading

  // AddPopup states
  const [isAddPopup, setIsAddPopup] = React.useState(false);
  const [addPopupInfo, setAddPopupInfo] = React.useState({
    rosterId: "",
    rosterName: "",
    rosterSize: "",
  });

  // Guild context states
  const guildData = useOutletContext();
  const [rosterList, setRosterList] = React.useState([]);

  // Check if the roster limit has been reached
  async function isRosterLimit(parentId, rosterMaxAmount) {
    const rosters = await guildRMApi.getMythicPlusRosters({ parentId });
    return rosters.length >= rosterMaxAmount;
  }

  // Add roster
  async function handleAddRoster(data) {
    setAddRosterIsPreloader(true);

    try {
      const isLimit = await isRosterLimit(data.parentId, data.rosterMaxAmount);
      if (!isLimit) {
        guildRMApi
          .addMythicPlusRoster(data)
          .then((newRoster) => {
            setAddRosterIsPreloader(false);

            setIsForm(false);
            setRosterList([...rosterList, newRoster]);
          })
          .catch((err) => {
            setAddRosterIsPreloader(false);

            // if can't connect to guildRMApi servers
            setIsPopup(true);
            setPopupInfo({
              title: "Server is not responding",
              text: "An unexpected error has occurred. Something has happened with our servers. Please, try again later.",
              buttonText: "Ok",
            });
            console.log("Raid handleAddRoster error:", err);
          });
      } else {
        setAddRosterIsPreloader(false);

        // if section has reached its rosters' limit
        setIsPopup(true);
        setPopupInfo({
          title: "Rosters limit has been hit",
          text: "Failed to add roster. You may have reached the roster limit. Please try refreshing the page.",
          buttonText: "Ok",
        });
        console.log("Roster limit has been hit");
      }
    } catch {
      setAddRosterIsPreloader(false);

      // if can't connect to guildRMApi servers
      setPopupInfo({
        title: "Server is not responding",
        text: "An unexpected error has occurred. Something has happened with our servers. Please, try again later.",
        buttonText: "Ok",
      });
    }
  }

  // Delete roster
  function handleDeleteRoster(data) {
    guildRMApi
      .deleteMythicPlusRoster(data)
      .then((deletedRoster) => {
        setRosterList(
          rosterList.filter((roster) => roster._id !== deletedRoster._id)
        );
      })
      .catch((err) => {
        // if can't connect to guildRMApi servers
        setIsPopup(true);
        setPopupInfo({
          title: "Server is not responding",
          text: "An unexpected error has occurred. Something has happened with our servers. Please, try again later.",
          buttonText: "Ok",
        });
        console.log("MythicPlus handleDeleteRoster error:", err);
      })
      .finally(() => setIsRosterPreloader(false));
  }

  // Search for rosters in the guild upon loading page
  React.useEffect(() => {
    setIsPageLoading(true);
    if (guildData) {
      guildRMApi
        .getMythicPlusRosters({ parentId: guildData._id })
        .then((rosters) => {
          setRosterList(rosters);
        })
        .catch((err) => {
          // if can't connect to guildRMApi servers
          setIsPopup(true);
          setPopupInfo({
            title: "Server is not responding",
            text: "An unexpected error has occurred. Something has happened with our servers. Please, try again later.",
            buttonText: "Ok",
          });
        })
        .finally(() => {
          setIsPageLoading(false);
        });
    }
  }, [guildData]);

  // Check if the limit has been reached
  async function isCharacterLimit(parentId, rosterSize) {
    const characters = await guildRMApi.getCharacters({ parentId });
    return characters.length >= rosterSize;
  }

  // Add a character to a roster
  async function handleAddCharacter(data) {
    setIsUpdatingRoster(data.parentId);
    setIsAddingCharacter(true);

    try {
      const isLimit = await isCharacterLimit(data.parentId, data.rosterSize);
      if (!isLimit) {
        const character = await raiderIoApi.getCharacterData(data);
        const newCharacter = await guildRMApi.addMythicPlusCharacter({
          ...character,
          parentId: data.parentId,
        });

        const rosterToUpdate = rosterList.find(
          (roster) => roster._id === newCharacter.parentId
        );
        rosterToUpdate.characters = [
          ...rosterToUpdate.characters,
          newCharacter,
        ];

        setIsAddPopup(false);
        setIsUpdatingRoster(null);
        setIsAddingCharacter(false);
      } else {
        setIsUpdatingRoster(null);
        setIsAddingCharacter(false);

        // if roster has reached its limit
        setIsPopup(true);
        setPopupInfo({
          title: "Roster limit has been hit",
          text: "Failed to add character. You may have reached the roster limit. Please try refreshing the page.",
          buttonText: "Ok",
        });
        console.log("Character limit has been hit");
      }
    } catch (err) {
      setIsUpdatingRoster(null);
      setIsAddingCharacter(false);

      // if realm is incorrect
      if (err.message.includes("Failed to find realm")) {
        setIsPopup(true);
        setPopupInfo({
          title: "Incorrect realm",
          text: "Could not find matching realm in the official realm list.",
          buttonText: "Ok",
        });
        return;
      }

      // if character name is incorrect
      if (err.message === "Could not find requested character") {
        setIsPopup(true);
        setPopupInfo({
          title: "Incorrect character name",
          text: "Could not find requested character in the raider.io database.",
          buttonText: "Ok",
        });
        return;
      }

      // if can't connect to guildRMApi servers
      setPopupInfo({
        title: "Server is not responding",
        text: "An unexpected error has occurred. Something has happened with our servers. Please, try again later.",
        buttonText: "Ok",
      });

      setIsPopup(true);
      console.log("MythicPlus handleAddCharacter error:", err);
    }
  }

  function handleDeleteCharacter(data) {
    setIsUpdatingRoster(data.parentId);

    guildRMApi
      .deleteMythicPlusCharacter(data)
      .then((deletedCharacter) => {
        const rosterToUpdate = rosterList.find(
          (roster) => roster._id === deletedCharacter.parentId
        );
        rosterToUpdate.characters = rosterToUpdate.characters.filter(
          (character) => character._id !== deletedCharacter._id
        );
      })
      .catch((err) => {
        // if can't connect to guildRMApi servers
        setIsPopup(true);
        setPopupInfo({
          title: "Server is not responding",
          text: "An unexpected error has occurred. Something has happened with our servers. Please, try again later.",
          buttonText: "Ok",
        });
        console.log("Roster deleteRaidCharacter error:", err);
      })
      .finally(() => {
        setIsUpdatingRoster(null);
      });
  }

  return (
    <section className="mythic-plus">
      {rosterList.map((roster) => (
        <Roster
          key={roster._id}
          name={roster.name}
          size={5}
          rosterId={roster._id}
          rosterType={sectionType}
          characters={roster.characters}
          isAddPopup={isAddPopup}
          addPopupInfo={addPopupInfo}
          setIsAddPopup={setIsAddPopup}
          setAddPopupInfo={setAddPopupInfo}
          handleDeleteRoster={handleDeleteRoster}
          isRosterPreloader={isRosterPreloader}
          isUpdatingRoster={isUpdatingRoster === roster._id}
          setIsPopup={setIsPopup}
          setPopupInfo={setPopupInfo}
          handleDeleteCharacter={handleDeleteCharacter}
          guildData={guildData}
          isAddingCharacter={isAddingCharacter}
        />
      ))}
      {isPageLoading && (
        <>
          <MythicPlusSkeleton />
          <MythicPlusSkeleton />
          <MythicPlusSkeleton />
        </>
      )}

      {!isPageLoading && rosterList.length < rosterMaxAmount && (
        <AddRoster
          isForm={isForm}
          setIsForm={setIsForm}
          rosterType={sectionType}
          isPreloader={isAddRosterPreloader}
          handleAddRoster={handleAddRoster}
          guildData={guildData}
          rosterMaxAmount={rosterMaxAmount}
        />
      )}
      <AddPopup
        popupType="character"
        isActive={isAddPopup}
        setIsAddPopup={setIsAddPopup}
        rosterId={addPopupInfo.rosterId}
        rosterName={addPopupInfo.rosterName}
        rosterSize={addPopupInfo.rosterSize}
        handleAddCharacter={handleAddCharacter}
        isUpdatingRoster={isUpdatingRoster !== null}
        guildData={guildData}
      />
    </section>
  );
}

export default MythicPlus;
