const mongoose = require('mongoose')
const raidRoster = require('./raidRoster')
const mythicPlusRoster = require('./mythicPlusRoster')

const guildSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 24,
    },
    faction: {
        type: String,
        required: true
    },
    region: {
        type: String,
        required: true,
    },
    realm: {
        type: String,
        required: true,
    },
    members: [],
    raid: [raidRoster.schema],
    mythicPlus: [mythicPlusRoster.schema],
})

module.exports = mongoose.model('guild', guildSchema)