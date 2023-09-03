const router = require("express").Router();
const {
  getGuilds,
  createGuild,
  deleteGuild,
  getCurrentGuild,
} = require("../controllers/guildController");

// Guild routes
router.get("/", getGuilds); //get all guilds
router.post("/", createGuild); //create a new guild
router.get("/:guildId", getCurrentGuild); //get current guild
router.delete("/:guildId", deleteGuild); //delete guild

module.exports = router;
