import './Home.css'
import { Link } from "react-router-dom"

function Home() {
    return (
        <section className="home">
            <p className="home__brief">Web application designed to make raiding easier</p>
            <button className="home__button">about us</button>
            <Link className="home__link" to={'/guilds'}>browse guilds</Link>
            <button className="home__button">how to use</button>
        </section>
    )
}

export default Home