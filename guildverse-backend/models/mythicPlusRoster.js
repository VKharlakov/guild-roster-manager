const mongoose = require('mongoose')
const character = require('./character')

const mythicPlusRosterSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    characters: [character.schema]
})

module.exports = mongoose.model('mythicPlusRoster', mythicPlusRosterSchema)