import "./GuildHeader.css";
import GuildHeaderSkeleton from "./GuildHeaderSkeleton/GuildHeaderSkeleton";
import CopyToClipboard from "react-copy-to-clipboard";
import React from "react";

function GuildHeader({
  guildData,
  setIsPopup,
  setPopupInfo,
  handleDeleteGuild,
}) {
  const currentPath = decodeURIComponent(window.location.href);
  const [isCopied, setIsCopied] = React.useState(false);

  function onCopy() {
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 1500);
  }

  function onDelete() {
    setIsPopup(true);
    setPopupInfo({
      title: "Are you sure?",
      text: `You are deleting a "${guildData.name}" guild. This action would be irreversible. Do you want to proceed?`,
      buttonText: "No",
      handleConfirm: () =>
        handleDeleteGuild({
          guildId: guildData._id,
          guildName: guildData.name.replace(/\s/g, "-").toLowerCase(),
          guildRegion: guildData.region,
          guildRealm: guildData.realm.replace(/\s/g, "-").toLowerCase(),
        }),
    });
  }

  return (
    <header className="guild-header">
      {guildData ? (
        <>
          <div className="guild-header__title-container">
            <h1 className="guild-header__title">{guildData.name}</h1>
            <p className="guild-header__brief">{`${guildData.members.length} active members`}</p>
          </div>
          <div className="guild-header__menu">
            <CopyToClipboard text={currentPath}>
              <button
                onClick={() => {
                  onCopy();
                }}
                className="guild-header__button guild-header__button_type_link"
              >
                <p className="guild-header__tooltip">
                  {isCopied ? "Copied!" : "Copy link"}
                </p>
              </button>
            </CopyToClipboard>
            <button
              className="guild-header__button guild-header__button_type_delete"
              onClick={() => {
                onDelete();
              }}
            >
              <p className="guild-header__tooltip">Delete guild</p>
            </button>
          </div>
        </>
      ) : (
        <GuildHeaderSkeleton />
      )}
    </header>
  );
}

export default GuildHeader;
