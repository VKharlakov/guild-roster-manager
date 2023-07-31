const router = require('express').Router()

const guildsRoutes = require('./guilds')

router.use('/guilds', guildsRoutes)

module.exports = router