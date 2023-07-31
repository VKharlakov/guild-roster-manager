import './Guilds.css'
import Header from "../Header/Header"
import { useContext } from 'react'
import { CurrentGuildContext } from '../../contexts/CurrentGuildContext'
import { Link } from 'react-router-dom'

function Guilds() {
    const currentGuild = useContext(CurrentGuildContext)
    return (
        <section className="guilds">
            <Header isGuildHeader={false} />
            <ul className="guilds__list">
                <li className="guilds__item">
                    <Link className='guilds__link' to={`/${currentGuild.name}`}>{currentGuild.name}</Link>
                </li>
                <li className="guilds__item">
                    <Link className='guilds__link' to={`/${currentGuild.name}`}>{currentGuild.name}</Link>
                </li>
                <li className="guilds__item">
                    <Link className='guilds__link' to={`/${currentGuild.name}`}>{currentGuild.name}</Link>
                </li>
                <li className="guilds__item">
                    <Link className='guilds__link' to={`/${currentGuild.name}`}>{currentGuild.name}</Link>
                </li>
                <li className="guilds__item">
                    <Link className='guilds__link' to={`/${currentGuild.name}`}>{currentGuild.name}</Link>
                </li>
                <li className="guilds__item">
                    <Link className='guilds__link' to={`/${currentGuild.name}`}>{currentGuild.name}</Link>
                </li>
            </ul>
        </section>
    )
}

export default Guilds