import React from "react";
import Sidebar from "./Sidebar";
import Raid from "./Raid";
import MythicPlus from "./MythicPlus";

function Main() {
    return (
        <main className="content">
            <Sidebar />
            <Raid />
            <MythicPlus />  
        </main>
    )
}

export default Main