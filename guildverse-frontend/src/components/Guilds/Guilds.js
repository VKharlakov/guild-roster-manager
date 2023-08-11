import './Guilds.css'
import React, { useContext } from 'react'
import { CurrentGuildContext } from '../../contexts/CurrentGuildContext'
import AddGuildPopup from '../Popup/AddGuildPopup'
import GuildBanner from '../GuildBanner/GuildBanner'

function Guilds() {
    const currentGuild = useContext(CurrentGuildContext)
    const [isPopupActive, setIsPopupActive] = React.useState(false)


    return (
        <section className="guilds">
            <main className='guilds__content'>
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
            </main>
            <AddGuildPopup isActive={isPopupActive} onClose={setIsPopupActive} />
        </section>
    )
}

export default Guilds