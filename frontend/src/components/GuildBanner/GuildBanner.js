import './GuildBanner.css'
import { Link } from 'react-router-dom'

function GuildBanner({ guildData }) {

    return (
        <li className='guild-banner'>
            <Link
                className={`guild-banner__link guild-banner__link_type_${guildData.faction}`}
                to={`/guilds/${guildData.region}/${guildData.realm.replace(/\s/g, '-').toLowerCase()}/${guildData.name.replace(/\s/g, '-').toLowerCase()}`}
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