const mongoose = require('mongoose')

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
    rioProfile: {
        type: String,
        required: true,
    },
    members: [],
    raid: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'raidRoster'
    }],
    mythicPlus: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'mythicPlusRoster'
    }],
})

module.exports = mongoose.model('guild', guildSchema)