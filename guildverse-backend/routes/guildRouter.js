const router = require('express').Router()
const { createGuild, deleteGuild, getGuilds } = require('../controllers/guildController')
const { addMythicPlusRoster, deleteMythicPlusRoster } = require('../controllers/mythicPlusController')
const { addRaidRoster, deleteRaidRoster } = require('../controllers/raidController')

// Guild routes
router.get('/', getGuilds)
router.post('/', createGuild)
router.delete('/:guildId', deleteGuild)

// Raid routes
router.put('/:guildId/raid', addRaidRoster)
router.delete('/:guildId/raid/:raidId', deleteRaidRoster)

// MythicPlus routes
router.put('/:guildId/mythic-plus', addMythicPlusRoster)
router.delete('/:guildId/mythic-plus/:mythicPlusId', deleteMythicPlusRoster)

module.exports = router