import './RosterInfoPanel.css'
import React from "react";

function RosterInfoPanel({
    array,
    roster,
    counter,
    rosterType,
}) {

    // Change counted roles/raiting when the roster is changed
    React.useEffect(() => {
        counter()
    }, [roster])

    return (
        <div className="roster-info-panel">
            {(rosterType === 'raid') &&
                <>
                    <div className="roster-info-panel__element">
                        <p className="roster-info-panel__number">{array.tanks}</p>
                        <div className="roster-info-panel__role roster-info-panel__role_type_tanks" />
                    </div>
                    <div className="roster-info-panel__element">
                        <p className="roster-info-panel__number">{array.healers}</p>
                        <div className="roster-info-panel__role roster-info-panel__role_type_healers" />
                    </div>
                    <div className="roster-info-panel__element">
                        <p className="roster-info-panel__number">{array.dps}</p>
                        <div className="roster-info-panel__role roster-info-panel__role_type_dps" />
                    </div>
                    <div className="roster-info-panel__element">
                        <p className="roster-info-panel__number">{array.total}</p>
                        <div className="roster-info-panel__role" />
                    </div>
                </>
            }
            {(rosterType === 'mythic-plus') &&
                <div className="roster-info-panel__element">
                    <p className="roster-info-panel__text">M+ score:</p>
                    <p className="roster-info-panel__number">{array || 0}</p>
                </div>
            }
        </div>
    )
}

export default RosterInfoPanel