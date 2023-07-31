const guilds = require('express').Router()
const { createGuild, addRaidRoster } = require('../controllers/guilds')

guilds.get('/')
guilds.post('/', createGuild)
guilds.patch('/:guildName', addRaidRoster)
guilds.delete('/:id')

module.exports = guilds