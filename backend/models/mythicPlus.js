const mongoose = require('mongoose')
const Character = require('./character')

const mythicPlusSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
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

// Deleting all Character before the delition of MythicPlus
mythicPlusSchema.pre('deleteOne', { query: false, document: true }, async function () {

    if (this.characters.length > 0) {
        this.characters.forEach(async (item) => {
            const character = await Character.findById(item)
            character.deleteOne()
        })
    }

})

module.exports = mongoose.model('mythicPlusRoster', mythicPlusSchema)