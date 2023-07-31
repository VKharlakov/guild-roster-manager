const mongoose = require('mongoose')
const character = require('./character')

const raidRosterSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        maxlength: 30
    },
    size: {
        type: Number,
        enum: [20, 40]
    },
    characters: [character.schema]
})

module.exports = mongoose.model('raidRoster', raidRosterSchema)