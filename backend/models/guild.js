const mongoose = require('mongoose')
const Raid = require('./raid')
const MythicPlus = require('./mythicPlus')

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

guildSchema.index({ name: 1, realm: 1 }, { unique: true });

// Recursive deletion of Raid and MythicPlus rosters
// from Guild.raid and Guild.mythicPlus
guildSchema.pre('deleteOne', { query: false, document: true }, async function () {

    // Deleting Raid
    if (this.raid.length > 0) {
        this.raid.forEach(async (item) => {
            const roster = await Raid.findById(item)
            roster.deleteOne()
        })
    }

    // Deleting MythicPlus
    if (this.mythicPlus.length > 0) {
        this.mythicPlus.forEach(async (item) => {
            const roster = await MythicPlus.findById(item)
            roster.deleteOne()
        })
    }
})

module.exports = mongoose.model('guild', guildSchema)