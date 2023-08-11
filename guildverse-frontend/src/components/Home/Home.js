import './Home.css'
import { Link } from "react-router-dom"

function Home() {
    return (
        <section className="home">
            <p className="home__brief">Web application designed to make raiding easier</p>
            <div className='home__button-container'>
                <button className="home__button">about us</button>
            </div>
            <div className='home__button-container'>
                <Link className="home__link" to={'/guilds'}>browse guilds</Link>
            </div>
            <div className='home__button-container'>
                <button className="home__button">how to use</button>
            </div>
        </section>
    )
}

export default Home