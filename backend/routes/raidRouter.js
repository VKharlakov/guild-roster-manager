const router = require('express').Router()
const { addRaidRoster, deleteRaidRoster, getRaidRosters } = require('../controllers/raidController')

// Raid routes
router.get('/', getRaidRosters)                 //find all Raid rosters within parent guild
router.post('/', addRaidRoster)                 //create a Raid roster and add to a 'parent' guild
router.delete('/:raidId', deleteRaidRoster)     //delete a Raid roster

module.exports = router