import React from "react";
import Sidebar from "./Sidebar";
import Raid from "./Raid";
import MythicPlus from "./MythicPlus";

function Main() {

    //Show / Hide sections states
    const [isRaidActive, setIsRaidActive] = React.useState(false)
    const [isMythicPlusActive, setIsMythicPlusActive] = React.useState(false)

    function resetSectionStates() {
        setIsRaidActive(false)
        setIsMythicPlusActive(false)
    }

    return (
        <main className="content">
            <Sidebar
                resetSectionStates={resetSectionStates}
                onRaidClick={setIsRaidActive}
                onMythicPlusClick={setIsMythicPlusActive}
            />
            <Raid
                isVisible={isRaidActive}
            />
            <MythicPlus
                isVisible={isMythicPlusActive}
            />
        </main>
    )
}

export default Main