import './GuildHeader.css'
import GuildHeaderSkeleton from './GuildHeaderSkeleton/GuildHeaderSkeleton'

function GuildHeader({ guildData }) {

    return (
        <header className="header">
            {guildData
                ? <div className="header__title-container">
                    <h1 className="header__title">{guildData.name}</h1>
                    <p className="header__brief">{`${guildData.members.length} active members`}</p>
                </div>
                : <GuildHeaderSkeleton />
            }
        </header>
    )
}

export default GuildHeader