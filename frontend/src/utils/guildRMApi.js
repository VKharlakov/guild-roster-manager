import { roles } from "./utils";

class GuildRMApi {
    constructor({ baseUrl, headers }) {
        this._url = baseUrl;
        this._headers = headers
    }

    _parseResponse(res) {
        if (res.ok) {
            return res.json()
        } else {
            return Promise.reject(`Error: ${res.status}`)
        }
    }

    // 
    // GUILDS
    // 

    // Get Guilds
    getGuilds() {
        return fetch(`${this._url}/guilds`, {
            method: 'GET',
            headers: this._headers
        })
            .then((res) => this._parseResponse(res))
    }

    // Get current Guild
    getCurrentGuild(data) {
        return fetch(`${this._url}/guilds/${data.guildId}`, {
            method: 'GET',
            headers: this._headers
        })
            .then((res) => this._parseResponse(res))
    }

    // Create Guild
    createGuild(data) {
        return fetch(`${this._url}/guilds`, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({
                name: data.name,
                faction: data.faction,
                region: data.region,
                realm: data.realm,
                rioProfile: data.profile_url,
                members: data.members
            })
        })
            .then((res) => this._parseResponse(res))
    }

    // Delete Guild
    deleteGuild(data) {
        return fetch(`${this._url}/guilds/${data.guildId}`, {
            method: 'DELETE',
            headers: this._headers
        })
            .then((res) => this._parseResponse(res))
    }

    // 
    // RAID
    // 

    // Add Raid roster
    addRaidRoster(data) {
        return fetch(`${this._url}/raid`, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({
                name: data.name,
                size: data.size,
                parentId: data.parentId
            })
        })
            .then((res) => this._parseResponse(res))
    }

    // Delete Raid roster
    deleteRaidRoster(data) {
        return fetch(`${this._url}/raid/${data.raidId}`, {
            method: 'DELETE',
            headers: this._headers,
            body: JSON.stringify({
                parentId: data.parentId
            })
        })
            .then((res) => this._parseResponse(res))
    }

    // 
    // MYTHIC PLUS
    // 

    // Add MythicPlus roster
    addMythicPlusRoster(data) {
        return fetch(`${this._url}/mythic-plus`, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({
                name: data.name,
                parentId: data.parentId
            })
        })
            .then((res) => this._parseResponse(res))
    }

    // Delete MythicPlus roster
    deleteMythicPlusRoster(data) {
        return fetch(`${this._url}/mythic-plus/${data.mythicPlusId}`, {
            method: 'DELETE',
            headers: this._headers,
            body: JSON.stringify({
                parentId: data.parentId
            })
        })
            .then((res) => this._parseResponse(res))
    }

    // 
    // CHARACTER
    // 

    // Add Character to Raid
    addRaidCharacter(data) {
        return fetch(`${this._url}/character/raid`, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({
                avatar: data.thumbnail_url,
                class: data.class,
                ilvl: data.gear.item_level_equipped,
                mythicPlusRaiting: data.mythic_plus_scores_by_season[0].scores.all,
                name: data.name,
                realm: data.realm,
                role: data.active_spec_role.toLowerCase(),
                roleId: roles.indexOf(data.active_spec_role.toLowerCase()),
                parentId: data.parentId
            })
        })
            .then((res) => this._parseResponse(res))
    }

    // Add Character to MythicPlus
    addMythicPlusCharacter(data) {
        return fetch(`${this._url}/character/mythic-plus`, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({
                avatar: data.thumbnail_url,
                class: data.class,
                ilvl: data.gear.item_level_equipped,
                mythicPlusRaiting: data.mythic_plus_scores_by_season[0].scores.all,
                name: data.name,
                realm: data.realm,
                role: data.active_spec_role.toLowerCase(),
                roleId: roles.indexOf(data.active_spec_role.toLowerCase()),
                parentId: data.parentId
            })
        })
            .then((res) => this._parseResponse(res))
    }

    // Delete Character from Raid
    deleteRaidCharacter(data) {
        return fetch(`${this._url}/character/raid/${data.characterId}`, {
            method: 'DELETE',
            headers: this._headers,
            body: JSON.stringify({
                parentId: data.parentId
            })
        })
            .then((res) => this._parseResponse(res))
    }

    // Delete Character from MythicPlus
    deleteMythicPlusCharacter(data) {
        return fetch(`${this._url}/character/mythic-plus/${data.characterId}`, {
            method: 'DELETE',
            headers: this._headers,
            body: JSON.stringify({
                parentId: data.parentId
            })
        })
            .then((res) => this._parseResponse(res))
    }
}

const guildRMApi = new GuildRMApi({
    baseUrl: 'https://guildrm.com/api',
    headers: {
        'Content-Type': 'application/json',
    }
})

export default guildRMApi