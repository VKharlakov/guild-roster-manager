const router = require("express").Router();
const {
  getCharacters,
  addRaidCharacter,
  deleteRaidCharacter,
  addMythicPlusCharacter,
  deleteMythicPlusCharacter,
} = require("../controllers/characterController");

// Character routes
router.post("/raid", addRaidCharacter); //add char to a Raid roster
router.get("/:parentId", getCharacters); //find all chars within parent roster
router.post("/mythic-plus", addMythicPlusCharacter); //add char to a MythicPlus roster
router.delete("/raid/:characterId", deleteRaidCharacter); //delete char from a Raid roster
router.delete("/mythic-plus/:characterId", deleteMythicPlusCharacter); //delete char from a MythicPlus roster

module.exports = router;
