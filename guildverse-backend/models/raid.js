const mongoose = require('mongoose')
const Character = require('./character')

const raidSchema = new mongoose.Schema({
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

// Deleting all Character before the delition of Raid
raidSchema.pre('deleteOne', { query: false, document: true }, async function () {

    if (this.characters.length > 0) {
        await Character.deleteMany({ _id: { $in: this.characters } })
    }

})

module.exports = mongoose.model('raidRoster', raidSchema)