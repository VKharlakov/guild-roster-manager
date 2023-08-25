import './GuildProfile.css'
import React from "react";
import Navbar from '../Navbar/Navbar';
import { Outlet, useNavigate } from "react-router-dom";
import guildRMApi from '../../utils/guildRMApi';
import GuildHeader from '../GuildHeader/GuildHeader';
import Preloader from '../Preloader/Preloader';

function GuildProfile({
    guildId,
    setIsErrorPopup,
    setErrorPopupInfo,
    handleDeleteGuild,
    isGuildDeletePreloader,
}) {
    const navigate = useNavigate()
    // Guild data state
    const [guildData, setGuildData] = React.useState()

    // Search for a current guild upon loading page
    React.useEffect(() => {
        guildRMApi.getCurrentGuild({ _id: guildId })
            .then((guild) => {
                setGuildData(guild)
            })
            .catch((err) => {
                navigate('/guilds')
                // if can't connect to guildRMApi servers
                setErrorPopupInfo({
                    title: 'Server is not responding',
                    text: 'An unexpected error has occurred. Something has happened with our servers. Please, try again later.',
                    buttonText: 'Ok',
                })
                setIsErrorPopup(true)
            })
    }, [guildId])

    return (
        <>
            <GuildHeader
                guildData={guildData}
                handleDeleteGuild={handleDeleteGuild}
            />
            <main className="guild-profile" >
                <Navbar />
                <Outlet context={guildData} />
                <Preloader isActive={isGuildDeletePreloader}/>
            </main>
        </>
    )
}

export default GuildProfile