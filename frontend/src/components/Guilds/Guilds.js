import './Guilds.css'
import React from 'react'
import AddPopup from '../AddPopup/AddPopup'
import Preloader from '../Preloader/Preloader'
import GuildBanner from '../GuildBanner/GuildBanner'
import GuildsSkeleton from './GuildsSkeleton/GuildsSkeleton'

function Guilds({
    isPreloader,
    isPageLoading,
    isGuildLoading,
    guildList,
    handleAddGuild,
    setIsAddPopup,
    setCurrentGuild,
    isAddPopup
}) {

    return (
        <main className="guilds">
            <div className='guilds__content'>
                <ul className="guilds__list">
                    {guildList.length > 0
                        ? guildList.map((guild) => (
                            <GuildBanner
                                key={guild._id}
                                guildData={guild}
                                setCurrentGuild={setCurrentGuild}
                            />
                        ))
                        : <>
                            {isPageLoading
                                ? <>
                                    <GuildsSkeleton />
                                    <GuildsSkeleton />
                                    <GuildsSkeleton />
                                    <GuildsSkeleton />
                                    <GuildsSkeleton />
                                </>
                                : <p className='guilds__nothing-found'>Nobody has added a guild here yet</p>
                            }
                        </>
                    }
                    {isGuildLoading &&
                        <GuildsSkeleton />
                    }
                </ul>
            </div>
            <AddPopup
                isActive={isAddPopup}
                setIsAddPopup={setIsAddPopup}
                handleAddGuild={handleAddGuild}
                isAddingGuild={isPreloader}
                popupType='guild'
            />
            <Preloader isActive={isPreloader} />
        </main>
    )
}

export default Guilds