export const roles = ['tank', 'healing', 'dps']

export function compareByRole(a, b) {
    return a.roleId - b.roleId
}

export function checkInputsValidity(inputs) {
    return inputs.every(input => input.validity.valid)
}

export function countAverage(array, field) {
    let amount = 0
    array.forEach((item) => {
        amount += item[field]
    })

    amount = amount / array.length
    return Math.floor(amount)
}

export function countRoles(array, role) {
    let amount = 0
    array.forEach((item) => {
        if (item.role === role) {
            amount++
        }
    })
    return amount
}