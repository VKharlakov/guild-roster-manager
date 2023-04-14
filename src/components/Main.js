import React from "react";
import Sidebar from "./Sidebar";
import Raid from "./Raid";
import api from "../utils/api";
import MythicPlus from "./MythicPlus";
import { Route, Routes } from "react-router-dom";

function Main() {
    //Add characters to Roster(s)
    function handleCardAdd(cardData, roster, rosterSetter) {
        api.getCharacterData(cardData)
            .then((res) => {
                rosterSetter([res, ...roster])
            })
    }

    //Delete character from a roster
    function handleCardDelete(roster, rosterSetter, id) {
        rosterSetter(roster.filter(card => roster.indexOf(card) !== id))
    }


    return (
        <main className="content">
            <Sidebar />
            <Routes>
                <Route path="/raid" element={
                    <Raid
                        onCardAdd={handleCardAdd}
                        onCardDelete={handleCardDelete}
                        sectionType='raid'
                    />}
                />
                <Route path="/mythic-plus" element={
                    <MythicPlus
                        onCardAdd={handleCardAdd}
                        onCardDelete={handleCardDelete}
                        sectionType='mythic-plus'
                    />}
                />
            </Routes>
        </main>
    )
}

export default Main