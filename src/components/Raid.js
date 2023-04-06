import React from "react";
import Roster from "./Roster";
import AddCharacterPopup from "./AddCharacterPopup";

function Raid() {
    return (
        <section className="raid" id="section">
            <Roster />
            <Roster />
            <AddCharacterPopup />
            <AddCharacterPopup />
        </section>
    )
}

export default Raid