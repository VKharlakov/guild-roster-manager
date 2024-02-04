import "./Guilds.css";
import React from "react";
import GuildBanner from "../GuildBanner/GuildBanner";
import GuildsSkeleton from "./GuildsSkeleton/GuildsSkeleton";
import AddPopup from "../ui/AddPopup/AddPopup";
import ModalContainer from "../ModalContainer/ModalContainer";
import { addGuildProps } from "src/utils/constants";

function Guilds({
  isAddPopup,
  isPreloader,
  setIsAddPopup,
  isPageLoading,
  isGuildLoading,
  handleAddGuild,
  setCurrentGuild,
  initialGuildList,
}) {
  const [guildList, setGuildList] = React.useState(initialGuildList);

  React.useEffect(() => {
    setGuildList(initialGuildList);
  }, [initialGuildList]);

  return (
    <main className="guilds">
      <div className="guilds__content">
        <ul className="guilds__list">
          {guildList.length > 0 ? (
            guildList.map((guild) => (
              <GuildBanner
                key={guild._id}
                guildData={guild}
                setCurrentGuild={setCurrentGuild}
              />
            ))
          ) : (
            <>
              {isPageLoading ? (
                <>
                  <GuildsSkeleton />
                  <GuildsSkeleton />
                  <GuildsSkeleton />
                  <GuildsSkeleton />
                  <GuildsSkeleton />
                </>
              ) : isGuildLoading ? (
                ""
              ) : (
                <p className="guilds__nothing-found">
                  Nobody has added a guild here yet
                </p>
              )}
            </>
          )}
          {isGuildLoading && <GuildsSkeleton />}
        </ul>
      </div>
      <ModalContainer>
        <AddPopup props={addGuildProps} />
      </ModalContainer>
    </main>
  );
}

export default Guilds;
