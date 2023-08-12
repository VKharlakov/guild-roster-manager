import './GuildProfile.css'
import React from "react";
import ErrorPopup from "../ErrorPopup/ErrorPopup";
import Navbar from '../Navbar/Navbar';
import { Outlet } from "react-router-dom";

function GuildProfile({ isErrorPopupOpen, setIsErrorPopupOpen, errorText }) {
    return (
        <section className="guild-profile" >
            <Navbar />
            <ErrorPopup isOpen={isErrorPopupOpen} onClose={setIsErrorPopupOpen} errorText={errorText} />

            <Outlet />
        </section>
    )
}

export default GuildProfile