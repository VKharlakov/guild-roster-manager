const mongoose = require('mongoose')

const mythicPlusRosterSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    characters: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'character'
    }]
})

module.exports = mongoose.model('mythicPlusRoster', mythicPlusRosterSchema)