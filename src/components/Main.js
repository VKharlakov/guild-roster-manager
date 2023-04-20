import React from "react";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";

function Main() {
    const [isSidebarActive, setIsSidebarActive] = React.useState(true)

    return (
        <main className="content">
            <Sidebar isOpen={isSidebarActive}/>
            <Outlet />
        </main>
    )
}

export default Main