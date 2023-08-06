const router = require('express').Router()
const { addRaidCharacter, addMythicPlusCharacter, deleteRaidCharacter, deleteMythicPlusCharacter } = require('../controllers/characterController')
const { createGuild, deleteGuild, getGuilds, getCurrentGuild } = require('../controllers/guildController')
const { addMythicPlusRoster, deleteMythicPlusRoster } = require('../controllers/mythicPlusController')
const { addRaidRoster, deleteRaidRoster } = require('../controllers/raidController')

// Guild routes
router.get('/', getGuilds)
router.get('/:guildId', getCurrentGuild)
router.post('/', createGuild)
router.delete('/:guildId', deleteGuild)

// Raid routes
router.put('/:guildId/raid', addRaidRoster)
router.delete('/:guildId/raid/:raidId', deleteRaidRoster)

// MythicPlus routes
router.put('/:guildId/mythic-plus', addMythicPlusRoster)
router.delete('/:guildId/mythic-plus/:mythicPlusId', deleteMythicPlusRoster)

// Character routes
router.post('/raid/:rosterId/character', addRaidCharacter)
router.post('/mythic-plus/:rosterId/character', addMythicPlusCharacter)
router.delete('/raid/:rosterId/character/:characterId', deleteRaidCharacter)
router.delete('/mythic-plus/:rosterId/character/:characterId', deleteMythicPlusCharacter)

module.exports = router