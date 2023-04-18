import React from "react";
import { NavLink, useLocation } from "react-router-dom";

function Sidebar({isActive}) {
    const currentPath = useLocation().pathname
    const [arrowStyle, setArrowStyle] = React.useState()

    //Calculate top positions of NavLink elements and set it to currentTopPosition
    function calculateCurrentTopPosition() {
        let raidSectionLocation = document.querySelector('#raid').offsetTop
        let mythicPlusSectionLocation = document.querySelector('#mythic-plus').offsetTop

        if (currentPath === '/raid') {
            setArrowStyle({
                top: `${Math.floor(raidSectionLocation)}px`,
                // transition: '.5s',
                opacity: 1
            })
        } else if (currentPath === '/mythic-plus') {
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
        <section className={`sidebar ${(isActive) ? '' : 'sidebar_hidden'}`}>
            <ul className={`sidebar__element-list ${(isActive) ? '' : 'sidebar_hidden'}`}>
                <li className="sidebar__element" id="raid">
                    <NavLink to={'raid'} className={({ isActive }) => isActive ? 'sidebar__btn sidebar__btn_clicked' : 'sidebar__btn'}>Raid</NavLink>
                </li>
                <li className="sidebar__element" id="mythic-plus">
                    <NavLink to={'mythic-plus'} className={({ isActive }) => isActive ? 'sidebar__btn sidebar__btn_clicked' : 'sidebar__btn'}>M+</NavLink>
                </li>
                <li className="sidebar__element">
                    <button className="sidebar__btn">Other</button>
                </li>
                <div className="sidebar__arrow" style={arrowStyle} />
            </ul>
        </section>
    )
}

export default Sidebar