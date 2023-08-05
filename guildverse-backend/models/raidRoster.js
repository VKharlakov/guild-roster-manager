const mongoose = require('mongoose')

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
    characters: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'character'
    }],
})

module.exports = mongoose.model('raidRoster', raidRosterSchema)