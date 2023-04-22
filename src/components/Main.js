import React from "react";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";
import ErrorPopup from "./ErrorPopup";

function Main({isErrorPopupOpen, setIsErrorPopupOpen, errorText}) {
    const [isSidebarActive, setIsSidebarActive] = React.useState(true)

    return (
        <main className="content">
            <Sidebar isOpen={isSidebarActive}/>
            <Outlet />

            <ErrorPopup  isOpen={isErrorPopupOpen} onClose={setIsErrorPopupOpen} errorText={errorText}/>
        </main>
    )
}

export default Main