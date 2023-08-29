export const roles = ['tank', 'healing', 'dps']

export function compareByRole(a, b) {
    return a.roleId - b.roleId
}

export function checkInputsValidity(inputs) {
    return inputs.every(input => input.validity.valid)
}