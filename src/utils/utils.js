export const roles = ['tank', 'healing', 'dps']

export function compareByRole(a, b) {
    return a.role_id - b.role_id
}
