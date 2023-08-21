import './GuildProfile.css'
import React from "react";
import Navbar from '../Navbar/Navbar';
import { Outlet } from "react-router-dom";

function GuildProfile() {
    return (
        <main className="guild-profile" >
            <Navbar />
            <Outlet />
        </main>
    )
}

export default GuildProfile