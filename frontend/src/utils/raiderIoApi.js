class RaiderIoApi {
    _parseResponse(res) {
        if (res.ok) {
            return res.json()
        } else {
            return res.json().then(data => {
                const error = new Error(data.message || 'An unknown error occurred.');
                error.status = res.status;
                throw error;
            });
        }
    }

    getCharacterData(data) {
        return fetch(`https://raider.io/api/v1/characters/profile?region=${data.region}&realm=${data.realm}&name=${data.name}&fields=gear%2Cmythic_plus_scores_by_season%3Acurrent`)
            .then((res) => this._parseResponse(res))
    }

    getGuildData(data) {
        return fetch(`https://raider.io/api/v1/guilds/profile?region=${data.region}&realm=${data.realm}&name=${data.name}&fields=members`)
            .then((res) => this._parseResponse(res))
    }
}

const raiderIoApi = new RaiderIoApi()

export default raiderIoApi