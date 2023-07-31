import './Home.css'
import logo from '../../images/header__logo_type_default.png'
import { Link } from "react-router-dom"

function Home() {
    return (
        <section className="home">
            <img className="home__logo" src={logo} alt="logo" />
            <h1 className="home__title">Welcome to
                <span className='home__title-emph'>
                    GuildVerse
                </span>
            </h1>
            <p className="home__brief">Web application designed to make raiding easier</p>
            <button className="home__button">about us</button>
            <Link className="home__link" to={'/guilds'}>browse guilds</Link>
            <button className="home__button">how to use</button>
        </section>
    )
}

export default Home