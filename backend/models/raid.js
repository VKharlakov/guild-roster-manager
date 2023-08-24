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
    parentId: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
})

// Delete all Character before deleting of Raid
raidSchema.pre('deleteOne', { query: false, document: true }, async function () {

    if (this.characters.length > 0) {
        this.characters.forEach(async (item) => {
            const character = await Character.findById(item)
            character.deleteOne()
        })
    }

})

module.exports = mongoose.model('raidRoster', raidSchema)