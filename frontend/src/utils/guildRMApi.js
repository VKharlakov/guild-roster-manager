import { roles } from "./utils";

class GuildRMApi {
  constructor({ baseUrl, headers }) {
    this._url = baseUrl;
    this._headers = headers;
  }

  _parseResponse(res) {
    if (res.ok) {
      return res.json();
    } else {
      return res.json().then((data) => {
        const error = new Error(data.message || "An unknown error occurred.");
        error.status = res.status;
        error.code = data.err.code || null;
        throw error;
      });
    }
  }

  //
  // GUILDS
  //

  // Get Guilds
  getGuilds() {
    return fetch(`${this._url}/guilds`, {
      method: "GET",
      headers: this._headers,
    }).then((res) => this._parseResponse(res));
  }

  // Get current Guild
  getCurrentGuild(data) {
    return fetch(`${this._url}/guilds/${data._id}`, {
      method: "GET",
      headers: this._headers,
    }).then((res) => this._parseResponse(res));
  }

  // Create Guild
  createGuild(data) {
    return fetch(`${this._url}/guilds`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        faction: data.faction,
        region: data.region,
        realm: data.realm,
        rioProfile: data.profile_url,
        members: data.members,
      }),
    }).then((res) => this._parseResponse(res));
  }

  // Delete Guild
  deleteGuild(data) {
    return fetch(`${this._url}/guilds/${data.guildId}`, {
      method: "DELETE",
      headers: this._headers,
    }).then((res) => this._parseResponse(res));
  }

  //
  // RAID
  //

  // Get Raid rosters
  getRaidRosters(data) {
    return fetch(`${this._url}/raid/${data.parentId}`, {
      method: "GET",
      headers: this._headers,
    }).then((res) => this._parseResponse(res));
  }

  // Add Raid roster
  addRaidRoster(data) {
    return fetch(`${this._url}/raid`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        size: data.size,
        parentId: data.parentId,
      }),
    }).then((res) => this._parseResponse(res));
  }

  // Delete Raid roster
  deleteRaidRoster(data) {
    return fetch(`${this._url}/raid/${data._id}`, {
      method: "DELETE",
      headers: this._headers,
      body: JSON.stringify({
        parentId: data.parentId,
      }),
    }).then((res) => this._parseResponse(res));
  }

  //
  // MYTHIC PLUS
  //

  // Get MythicPlus rosters
  getMythicPlusRosters(data) {
    return fetch(`${this._url}/mythic-plus/${data.parentId}`, {
      method: "GET",
      headers: this._headers,
    }).then((res) => this._parseResponse(res));
  }

  // Add MythicPlus roster
  addMythicPlusRoster(data) {
    return fetch(`${this._url}/mythic-plus`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        parentId: data.parentId,
      }),
    }).then((res) => this._parseResponse(res));
  }

  // Delete MythicPlus roster
  deleteMythicPlusRoster(data) {
    return fetch(`${this._url}/mythic-plus/${data._id}`, {
      method: "DELETE",
      headers: this._headers,
      body: JSON.stringify({
        parentId: data.parentId,
      }),
    }).then((res) => this._parseResponse(res));
  }

  //
  // CHARACTER
  //

  // Get Characters
  getCharacters(data) {
    return fetch(`${this._url}/character/${data.parentId}`, {
      method: "GET",
      headers: this._headers,
    }).then((res) => this._parseResponse(res));
  }

  // Add Character to Raid
  addRaidCharacter(data) {
    return fetch(`${this._url}/character/raid`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        avatar: data.thumbnail_url,
        class: data.class,
        region: data.region,
        ilvl: data.gear.item_level_equipped,
        mythicPlusRaiting: data.mythic_plus_scores_by_season[0].scores.all,
        name: data.name,
        realm: data.realm,
        role: data.active_spec_role.toLowerCase(),
        roleId: roles.indexOf(data.active_spec_role.toLowerCase()),
        parentId: data.parentId,
        rioProfile: data.profile_url,
      }),
    }).then((res) => this._parseResponse(res));
  }

  // Add Character to MythicPlus
  addMythicPlusCharacter(data) {
    return fetch(`${this._url}/character/mythic-plus`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        avatar: data.thumbnail_url,
        class: data.class,
        region: data.region,
        ilvl: data.gear.item_level_equipped,
        mythicPlusRaiting: data.mythic_plus_scores_by_season[0].scores.all,
        name: data.name,
        realm: data.realm,
        role: data.active_spec_role.toLowerCase(),
        roleId: roles.indexOf(data.active_spec_role.toLowerCase()),
        parentId: data.parentId,
        rioProfile: data.profile_url,
      }),
    }).then((res) => this._parseResponse(res));
  }

  // Delete Character from Raid
  deleteRaidCharacter(data) {
    return fetch(`${this._url}/character/raid/${data.characterId}`, {
      method: "DELETE",
      headers: this._headers,
      body: JSON.stringify({
        parentId: data.parentId,
      }),
    }).then((res) => this._parseResponse(res));
  }

  // Delete Character from MythicPlus
  deleteMythicPlusCharacter(data) {
    return fetch(`${this._url}/character/mythic-plus/${data.characterId}`, {
      method: "DELETE",
      headers: this._headers,
      body: JSON.stringify({
        parentId: data.parentId,
      }),
    }).then((res) => this._parseResponse(res));
  }
}

const guildRMApi = new GuildRMApi({
  baseUrl: "http://localhost:4000",
  headers: {
    "Content-Type": "application/json",
  },
});

// https://guildrm.com/api
// http://localhost:4000

export default guildRMApi;
