const router = require('express').Router()
const guildRouter = require('./guildRouter')

router.use('/guilds', guildRouter)

module.exports = router