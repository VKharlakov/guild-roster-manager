import './Brief.css'

function Brief() {
    return (
        <section className='brief'>
            <div className='brief__container'>
                <div className='brief__paragraph'>
                    <h2 className='brief__title'>What is ...</h2>
                    <div className='brief__text-container'>
                        <p className='brief__text'><span className='brief__emph-text'>Guild Roster Manager</span> is an online service designed to simplify the process of monitoring raid group composition and strength. By creating a roster and adding characters to it, you can easily assess your chances of defeating bosses by viewing the added characters' item levels, classes, and roles that will be present in the raid. All character information is fetched from the raider.io API resource and is updated automatically. This ensures that once a character is added, the information about them remains up to date.</p>
                    </div>
                </div>
                <div className='brief__paragraph'>
                    <h2 className='brief__title'>How to ...</h2>
                    <div className='brief__text-container'>
                        <p className='brief__text'>To get started, simply add your guild to the list of tracked guilds (if it's not already there), create a roster in the guild profile, and share the link with everyone who's planning to join your raid! They can follow the link and add their characters to the roster you've created.</p>
                        <p className='brief__text'>Currently, the project is in its early development stage, so there might be some bugs. For any questions, issues, or suggestions, feel free to reach out to us via email: <span className='brief__emph-text'>guildrostermanager@gmail.com</span>.</p>
                        <p className='brief__text'>Good luck in the raid!</p>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Brief