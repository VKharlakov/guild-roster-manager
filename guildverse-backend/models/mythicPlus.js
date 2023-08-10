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
    }]
})

// Deleting all Character before the delition of MythicPlus
mythicPlusSchema.pre('deleteOne', { query: false, document: true }, async function () {

    if (this.characters.length > 0) {
        await Character.deleteMany({ _id: { $in: this.characters } })
    }

})

module.exports = mongoose.model('mythicPlusRoster', mythicPlusSchema)