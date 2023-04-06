import {
    sidebar,
    tankCounter,
    healerCounter,
    dpsCounter,
    totalCount,
    roleList
} from "./constants.js"

//Функция по сокрытию/отображению sidebar
export function hideSidebar() {
    sidebar.classList.toggle('sidebar_hidden')
}

function countRoles() {
    roleList.dps = Array.from(document.querySelectorAll('.characters__role_type_dps')).length
    roleList.healers = Array.from(document.querySelectorAll('.characters__role_type_healer')).length
    roleList.tanks = Array.from(document.querySelectorAll('.characters__role_type_tank')).length
}

// export function setRoleCount() {
//     countRoles()
//     tankCounter.textContent = roleList.tanks
//     healerCounter.textContent = roleList.healers
//     dpsCounter.textContent = roleList.dps
//     totalCount.textContent = roleList.dps + roleList.healers + roleList.tanks
// }
