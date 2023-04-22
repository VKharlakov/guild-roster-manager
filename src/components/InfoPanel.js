import React from "react";

function InfoPanel({ rosterType, counter, array, roster }) {
    React.useEffect(() => {
        counter()
    }, [roster])

    return (
        <div className="roster__info-panel">
            {(rosterType === 'raid') &&
                <>
                    <div className="roster__info-element">
                        <p className="roster__info-number">{array.tanks}</p>
                        <div className="roster__info-role-icon roster__info-role-icon_type_tanks" />
                    </div>
                    <div className="roster__info-element">
                        <p className="roster__info-number">{array.healers}</p>
                        <div className="roster__info-role-icon roster__info-role-icon_type_healers" />
                    </div>
                    <div className="roster__info-element">
                        <p className="roster__info-number">{array.dps}</p>
                        <div className="roster__info-role-icon roster__info-role-icon_type_dps" />
                    </div>
                    <div className="roster__info-element">
                        <p className="roster__info-number">{array.total}</p>
                        <div className="roster__info-role-icon" />
                    </div>
                </>
            }
            {(rosterType === 'mythic-plus') &&
                <div className="roster__info-element">
                    <p className="roster__info-text">M+ score:</p>
                    <p className="roster__info-number">{array || 0}</p>
                </div>
            }
        </div>
    )
}

export default InfoPanel