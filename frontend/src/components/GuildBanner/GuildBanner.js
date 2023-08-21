import './GuildBanner.css'
import guildRMApi from '../../utils/guildRMApi'
import { Link } from 'react-router-dom'

function GuildBanner({ guildData, setCurrentGuild }) {

    function handleClick() {
        guildRMApi.getCurrentGuild(guildData)
        .then((res) => {
            setCurrentGuild(res)
        })
        .catch((err) => console.log('GuildBanner handleClick error:', err))
    }

    return (
        <li className='guild-banner'>
            <Link
                className={`guild-banner__link guild-banner__link_type_${guildData.faction}`}
                onClick={() => handleClick()}
                to={`/guilds/${guildData.name.replace(/\s/g, '-').toLowerCase()}`}
            >
                <h2 className='guild-banner__title'>{guildData.name}</h2>
                <div className='guild-banner__members'>
                    <i className='guild-banner__icon' />
                    <p className='guild-banner__text'>{guildData.members.length}</p>
                </div>
                <span className='guild-banner__arrow' />
            </Link>
        </li>
    )
}

export default GuildBanner