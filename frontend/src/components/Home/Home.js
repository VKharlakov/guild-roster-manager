import './Home.css'
import Brief from './Brief/Brief'
import Intro from './Intro/Intro'
import Contacts from './Contacts/Contacts'

function Home() {
    return (
        <main className="home">
            <Intro />
            <Brief />
            <Contacts />
        </main>
    )
}

export default Home