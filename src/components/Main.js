import React from "react";
import Sidebar from "./Sidebar";
import Raid from "./Raid";
import api from "../utils/api";
import MythicPlus from "./MythicPlus";
import { Route, Routes } from "react-router-dom";
import { compareByRole, roles } from "../utils/utils";

function Main() {
    //Add characters to Roster(s)
    function handleCardAdd(cardData, roster, rosterSetter) {
        api.getCharacterData(cardData)
            .then((res) => {
                rosterSetter([{
                    name: res.name,
                    class: res.class,
                    realm: res.realm,
                    role: res.active_spec_role.toLowerCase(),
                    role_id: roles.indexOf(res.active_spec_role.toLowerCase()),
                    ilvl: res.gear.item_level_equipped,
                    avatar: res.thumbnail_url,
                }, ...roster].sort(compareByRole))
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