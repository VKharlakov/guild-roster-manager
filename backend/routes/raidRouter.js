const router = require("express").Router();
const {
  addRaidRoster,
  deleteRaidRoster,
  getRaidRosters,
} = require("../controllers/raidController");

// Raid routes
router.post("/", addRaidRoster); //create a Raid roster and add to a 'parent' guild
router.get("/:parentId", getRaidRosters); //find all Raid rosters within parent guild
router.delete("/:raidId", deleteRaidRoster); //delete a Raid roster

module.exports = router;
