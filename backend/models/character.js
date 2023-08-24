const mongoose = require('mongoose')

const characterSchema = new mongoose.Schema({
    avatar: {
        type: String,
        required: true
    },
    class: {
        type: String,
        required: true
    },
    ilvl: {
        type: Number,
        required: true
    },
    mythicPlusRaiting: {
        type: Number
    },
    name: {
        type: String,
        required: true
    },
    realm: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['tank', 'healing', 'dps']
    },
    roleId: {
        type: Number,
        enum: [0, 1, 2]
    },
    parentId: {
        type: String,
        required: true
    },
    rioProfile: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
})


module.exports = mongoose.model('character', characterSchema)