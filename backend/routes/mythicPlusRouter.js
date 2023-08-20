const router = require('express').Router()
const { addMythicPlusRoster, deleteMythicPlusRoster, getMythicPlusRosters } = require('../controllers/mythicPlusController')

// MythicPlus routes
router.get('/', getMythicPlusRosters)                       //find all MythicPlus rosters within parent guild
router.post('/', addMythicPlusRoster)                       //create a MythicPlus roster and add to a 'parent' guild
router.delete('/:mythicPlusId', deleteMythicPlusRoster)     //delete a MythicPlus roster

module.exports = router