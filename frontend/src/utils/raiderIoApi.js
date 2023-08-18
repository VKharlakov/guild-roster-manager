class RaiderIoApi {
    _parseResponse(res) {
        if (res.ok) {
            return res.json()
        } else {
            return Promise.reject(`Произошла ошибка: ${res.status}`)
        }
    }

    getCharacterData(data) {
        return fetch(`https://raider.io/api/v1/characters/profile?region=${data.region}&realm=${data.realm}&name=${data.name}&fields=gear%2Cmythic_plus_scores_by_season%3Acurrent`)
        .then((res) => this._parseResponse(res))
    }

    getGuildData(region, realm, name) {
        return fetch(`https://raider.io/api/v1/guilds/profile?region=${region}&realm=${realm}&name=${name}&fields=members`)
        .then((res) => this._parseResponse(res))
    }
}

const raiderIoApi = new RaiderIoApi()

export default raiderIoApi