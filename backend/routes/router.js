const router = require("express").Router();
const raidRouter = require("./raidRouter");
const guildRouter = require("./guildRouter");
const characterRouter = require("./characterRouter");
const mythicPlusRouter = require("./mythicPlusRouter");

router.use("/raid", raidRouter);
router.use("/guilds", guildRouter);
router.use("/character", characterRouter);
router.use("/mythic-plus", mythicPlusRouter);

module.exports = router;
