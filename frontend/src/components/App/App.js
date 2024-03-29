import "./App.css";
import React from "react";
import Raid from "../Raid/Raid";
import Popup from "../Popup/Popup";
import Header from "../Header/Header";
import Guilds from "../Guilds/Guilds";
import MythicPlus from "../MythicPlus/MythicPlus";
import GuildProfile from "../GuildProfile/GuildProfile";
import PageNotFound from "../PageNotFound/PageNotFound";
import { Route, Routes, useNavigate } from "react-router-dom";

// Api imports
import guildRMApi from "../../utils/guildRMApi";
import raiderIoApi from "../../utils/raiderIoApi";

function App() {
  const [guildList, setGuildList] = React.useState([]); //All guilds state array
  const [isAddPopup, setIsAddPopup] = React.useState(false); //Add guild popup state
  const [isPreloader, setIsPreloader] = React.useState(true); //Preloader state
  const [isPageLoading, setIsPageLoading] = React.useState(true); //Upon loading page "skeleton" state
  const [isGuildLoading, setIsGuildLoading] = React.useState(false); //When adding guild "skeleton" state
  const [isGuildDeletePreloader, setIsGuildDeletePreloader] =
    React.useState(false);

  // Error popup states
  const [isPopup, setIsPopup] = React.useState(false);
  const [popupInfo, setPopupInfo] = React.useState({
    title: "",
    text: "",
    buttonText: "",
  });

  const navigate = useNavigate();

  // Get all guilds
  React.useEffect(() => {
    guildRMApi
      .getGuilds()
      .then((guilds) => {
        setGuildList(guilds);
      })
      .catch((err) => {
        setPopupInfo({
          title: "Server is not responding",
          text: "An unexpected error has occurred. Something has happened with our servers. Please, try again later.",
          buttonText: "Ok",
        });
        setIsPopup(true);
      })
      .finally(() => {
        setTimeout(() => {
          setIsPageLoading(false);
          setIsPreloader(false);
        }, 150);
      });
  }, []);

  // Add guild
  function handleAddGuild(data) {
    setIsPreloader(true);
    raiderIoApi
      .getGuildData(data)
      .then((guild) => {
        setIsGuildLoading(true);
        guildRMApi
          .createGuild(guild)
          .then((res) => {
            setGuildList([...guildList, res]);
            setIsAddPopup(false);
          })
          .catch((err) => {
            // if such guild already exists
            if (err.code === 11000) {
              setIsPopup(true);
              setPopupInfo({
                title: "Guild already exists",
                text: "Someone has already added your guild!",
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
          })
          .finally(() => {
            setIsGuildLoading(false);
            setIsPreloader(false);
          });
      })
      .catch((err) => {
        // if realm is incorrect
        if (err.message.includes("Failed to find realm")) {
          setIsPopup(true);
          setPopupInfo({
            title: "Incorrect realm",
            text: "Could not find matching realm in the official realm list.",
            buttonText: "Ok",
          });
          setIsPreloader(false);
          return;
        }

        // if guild name is incorrect
        if (err.message === "Could not find requested guild") {
          setIsPopup(true);
          setPopupInfo({
            title: "Incorrect guild name",
            text: "Could not find requested guild in the raider.io database. It does not mean, that there is no such guild, it just means that raider.io has not recognised it potential yet!",
            buttonText: "Ok:)",
          });
          setIsPreloader(false);
          return;
        }

        console.log("handleAddGuild error:", err);
      });
  }

  // Delete guild
  function handleDeleteGuild(data) {
    navigate(
      `/guilds/${data.guildRegion}/${data.guildRealm}/${data.guildName}`
    );
    setIsGuildDeletePreloader(true);
    guildRMApi
      .deleteGuild(data)
      .then((deletedGuild) => {
        setGuildList(
          guildList.filter((guild) => guild._id !== deletedGuild._id)
        );
        navigate("/guilds");
      })
      .catch((err) => {
        // if can't connect to guildRMApi servers
        setIsPopup(true);
        setPopupInfo({
          title: "Server is not responding",
          text: "An unexpected error has occurred. Something has happened with our servers. Please, try again later.",
          buttonText: "Ok",
        });
        console.log("App handleDeleteGuild error:", err);
      })
      .finally(() => {
        setIsGuildDeletePreloader(false);
      });
  }

  return (
    <section className="app">
      <Routes>
        <Route path="/" element={<Header setIsAddPopup={setIsAddPopup} />}>
          <Route
            path="guilds"
            element={
              <Guilds
                isPreloader={isPreloader}
                isPageLoading={isPageLoading}
                isGuildLoading={isGuildLoading}
                isAddPopup={isAddPopup}
                setIsAddPopup={setIsAddPopup}
                initialGuildList={guildList}
                handleAddGuild={handleAddGuild}
              />
            }
          />
          {guildList.length > 0 &&
            guildList.map((guild) => (
              <Route
                key={guild._id}
                path={`guilds/${guild.region}/${guild.realm
                  .replace(/\s/g, "-")
                  .toLowerCase()}/${encodeURIComponent(
                  guild.name.replace(/\s/g, "-").toLowerCase()
                )}`}
                element={
                  <GuildProfile
                    guildId={guild._id}
                    setPopupInfo={setPopupInfo}
                    setIsPopup={setIsPopup}
                    handleDeleteGuild={handleDeleteGuild}
                    isGuildDeletePreloader={isGuildDeletePreloader}
                  />
                }
              >
                <Route
                  path=""
                  element={
                    <div className="guild-profile__placeholder">
                      <h2 className="guild-profile__placeholder-title">
                        There will be something soon
                      </h2>
                      <p className="guild-profile__placeholder-text">
                        ... but for now, check out Raid and M+ tabs!
                      </p>
                      <span className="guild-profile__placeholder-image" />
                    </div>
                  }
                />
                <Route
                  path="raid"
                  element={
                    <Raid
                      sectionType="raid"
                      rosterMaxAmount="4"
                      setPopupInfo={setPopupInfo}
                      setIsPopup={setIsPopup}
                    />
                  }
                />
                <Route
                  path="mythic-plus"
                  element={
                    <MythicPlus
                      sectionType="mythic-plus"
                      rosterMaxAmount="6"
                      setPopupInfo={setPopupInfo}
                      setIsPopup={setIsPopup}
                    />
                  }
                />
              </Route>
            ))}
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      <Popup
        popupInfo={popupInfo}
        setIsPopup={setIsPopup}
        isActive={isPopup}
        handleDeleteGuild={handleDeleteGuild}
      />
    </section>
  );
}

export default App;
