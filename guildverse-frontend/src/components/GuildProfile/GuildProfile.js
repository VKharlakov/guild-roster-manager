import React from "react";
import Sidebar from "../Sidebar/Sidebar";
import ErrorPopup from "../ErrorPopup/ErrorPopup";
import './GuildProfile.css'
import { Outlet } from "react-router-dom";
import Header from "../Header/Header";

function GuildProfile({ isErrorPopupOpen, setIsErrorPopupOpen, errorText }) {
    const [isSidebarActive, setIsSidebarActive] = React.useState(true)

    return (
        <section className="guild-profile" >
            <Header isGuildHeader={true}/>
            <Sidebar isOpen={isSidebarActive} />
            <ErrorPopup isOpen={isErrorPopupOpen} onClose={setIsErrorPopupOpen} errorText={errorText} />

            <Outlet />
        </section>
    )
}

export default GuildProfile