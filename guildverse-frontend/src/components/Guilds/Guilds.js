import './Guilds.css'
import React, { useContext } from 'react'
import { CurrentGuildContext } from '../../contexts/CurrentGuildContext'
import GuildBanner from '../GuildBanner/GuildBanner'
import AddPopup from '../AddPopup/AddPopup'

function Guilds({isPopupOpen, handleClose}) {
    const currentGuild = useContext(CurrentGuildContext)


    return (
        <main className="guilds">
            <div className='guilds__content'>
                <ul className="guilds__list">
                    <GuildBanner currentGuild={currentGuild} />
                    <GuildBanner currentGuild={{name: 'TEST', faction: 'horde', active_members: [{},{},{}]}} />
                    <GuildBanner currentGuild={currentGuild} />
                    <GuildBanner currentGuild={currentGuild} />
                    <GuildBanner currentGuild={currentGuild} />
                    <GuildBanner currentGuild={currentGuild} />
                    <GuildBanner currentGuild={currentGuild} />
                    <GuildBanner currentGuild={currentGuild} />
                    <GuildBanner currentGuild={currentGuild} />
                    <GuildBanner currentGuild={currentGuild} />
                    <GuildBanner currentGuild={currentGuild} />
                    <GuildBanner currentGuild={currentGuild} />
                    <GuildBanner currentGuild={currentGuild} />
                    <GuildBanner currentGuild={currentGuild} />
                    <GuildBanner currentGuild={currentGuild} />
                    <GuildBanner currentGuild={currentGuild} />
                    <GuildBanner currentGuild={currentGuild} />
                    <GuildBanner currentGuild={currentGuild} />
                    <GuildBanner currentGuild={currentGuild} />
                </ul>
            </div>
            <AddPopup isActive={isPopupOpen} onClose={handleClose} popupType='guild'/>
        </main>
    )
}

export default Guilds