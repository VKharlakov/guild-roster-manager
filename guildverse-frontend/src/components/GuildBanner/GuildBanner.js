import './GuildBanner.css'
import { Link } from 'react-router-dom'

function GuildBanner({ currentGuild }) {
    return (
        <li className='guild-banner'>
            <Link className={`guild-banner__link guild-banner__link_type_${currentGuild.faction}`} to={`/${currentGuild.name}`}>
                <h2 className='guild-banner__title'>{currentGuild.name}</h2>
                <div className='guild-banner__members'>
                    <i className='guild-banner__icon'/>
                    <p className='guild-banner__text'>{currentGuild.active_members.length}</p>
                </div>
                <span className='guild-banner__arrow'/>
            </Link>
        </li>
    )
}

export default GuildBanner