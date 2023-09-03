import "./GuildProfile.css";
import React from "react";
import Navbar from "../Navbar/Navbar";
import { Outlet, useNavigate } from "react-router-dom";
import guildRMApi from "../../utils/guildRMApi";
import GuildHeader from "../GuildHeader/GuildHeader";
import Preloader from "../Preloader/Preloader";

function GuildProfile({
  guildId,
  setIsPopup,
  setPopupInfo,
  handleDeleteGuild,
  isGuildDeletePreloader,
}) {
  const navigate = useNavigate();
  // Guild data state
  const [guildData, setGuildData] = React.useState();

  // Search for a current guild upon loading page
  React.useEffect(() => {
    guildRMApi
      .getCurrentGuild({ _id: guildId })
      .then((guild) => {
        setGuildData(guild);
      })
      .catch((err) => {
        navigate("/guilds");
        // if can't connect to guildRMApi servers
        setPopupInfo({
          title: "Server is not responding",
          text: "An unexpected error has occurred. Something has happened with our servers. Please, try again later.",
          buttonText: "Ok",
        });
        setIsPopup(true);
      });
  }, [guildId]);

  return (
    <>
      <GuildHeader
        guildData={guildData}
        handleDeleteGuild={handleDeleteGuild}
        setIsPopup={setIsPopup}
        setPopupInfo={setPopupInfo}
      />
      <main className="guild-profile">
        <Navbar />
        <Outlet context={guildData} />
        <Preloader isActive={isGuildDeletePreloader} />
      </main>
    </>
  );
}

export default GuildProfile;
