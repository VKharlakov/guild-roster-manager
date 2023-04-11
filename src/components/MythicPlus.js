import React from "react";

function MythicPlus({isVisible}) {
    return (
        <section className={`M ${isVisible ? "" : "M_hidden"}`}>
            <h1 className="M__placeholder">
                This page is under construction
            </h1>
        </section>
    )
}

export default MythicPlus