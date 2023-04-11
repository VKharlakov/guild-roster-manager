class Api {
    constructor() {
    }

    _parseResponse(res) {
        if (res.ok) {
            return res.json()
        } else {
            return Promise.reject(`Произошла ошибка: ${res.status}`)
        }
    }

    getCharacterData(data) {
        return fetch(`https://raider.io/api/v1/characters/profile?region=${data.region}&realm=${data.realm}&name=${data.name}&fields=gear`)
        .then((res) => this._parseResponse(res))
    }

    getGuildData(data) {
        return fetch(`https://raider.io/api/v1/guilds/profile?region=${data.region}&realm=${data.realm}&name=${data.name}&fields=members`)
        .then((res) => this._parseResponse(res))
    }
}

const api = new Api()

export default api