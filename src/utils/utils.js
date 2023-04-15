export const roles = ['tank', 'heal', 'dps']

export function compareByRole(a, b) {
    return a.role_id - b.role_id
}
