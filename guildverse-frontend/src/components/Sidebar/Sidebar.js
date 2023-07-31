import React from "react";
import './Sidebar.css';
import { NavLink, useLocation } from "react-router-dom";

function Sidebar({isOpen}) {
    const currentPath = useLocation().pathname
    const [arrowStyle, setArrowStyle] = React.useState()

    //Calculate top positions of NavLink elements and set it to currentTopPosition
    function calculateCurrentTopPosition() {
        let raidSectionLocation = document.querySelector('#raid').offsetTop
        let mythicPlusSectionLocation = document.querySelector('#mythic-plus').offsetTop

        if (currentPath === 'raid') {
            setArrowStyle({
                top: `${Math.floor(raidSectionLocation)}px`,
                // transition: '.5s',
                opacity: 1
            })
        } else if (currentPath === 'mythic-plus') {
            setArrowStyle({
                top: `${Math.floor(mythicPlusSectionLocation)}px`,
                // transition: '.5s',
                opacity: 1
            })
        } else {
            setArrowStyle()
        }
    }

    React.useEffect(() => {

        calculateCurrentTopPosition()

    }, [currentPath])

    return (
        <section className={`sidebar ${(isOpen) ? '' : 'sidebar_hidden'}`}>
            <ul className={`sidebar__element-list ${(isOpen) ? '' : 'sidebar_hidden'}`}>
                <li className="sidebar__element" id="raid">
                    <NavLink to={'raid'} className={({isActive}) => isActive ? 'sidebar__button sidebar__button_type_raid sidebar__button_clicked' : 'sidebar__button sidebar__button_type_raid '}>Raid</NavLink>
                </li>
                <li className="sidebar__element" id="mythic-plus">
                    <NavLink to={'mythic-plus'} className={({isActive}) => isActive ? 'sidebar__button sidebar__button_type_mythic-plus sidebar__button_clicked' : 'sidebar__button sidebar__button_type_mythic-plus '}>M+</NavLink>
                </li>
                <div className="sidebar__arrow" style={arrowStyle} />
            </ul>
        </section>
    )
}

export default Sidebar