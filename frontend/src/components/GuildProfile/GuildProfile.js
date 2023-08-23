import './GuildProfile.css'
import React from "react";
import Navbar from '../Navbar/Navbar';
import { Outlet } from "react-router-dom";
import guildRMApi from '../../utils/guildRMApi';
import GuildHeader from '../GuildHeader/GuildHeader';

function GuildProfile({ guildId, setErrorPopupInfo, setIsErrorPopup }) {

    // Guild data state
    const [guildData, setGuildData] = React.useState()

    // Search for a current guild upon loading page
    React.useEffect(() => {
        guildRMApi.getCurrentGuild({ _id: guildId })
            .then((guild) => {
                setGuildData(guild)
            })
            .catch((err) => {
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
            <GuildHeader guildData={guildData} />
            <main className="guild-profile" >
                <Navbar />
                <Outlet context={guildData} />
            </main>
        </>
    )
}

export default GuildProfile