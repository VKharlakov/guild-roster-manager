const NotFound = require('../errors/NotFound')
const Guild = require('../models/guild')

module.exports.createGuild = (req, res) => {
    const {
        name,
        faction,
        region,
        realm,
        raid,
        mythicPlus
    } = req.body

    Guild.create(req.body)
        .then((guild) => res.status(201).send(guild))
        .catch((err) => res.status(500).send({ message: 'err', err }))
}

//64c696b74f3f47f51b117065

module.exports.addRaidRoster = (req, res) => {
    const { guildName } = req.params
    const { rosterId, name, size, characters } = req.body
    const newRaidRoster = { name, size, characters }

    Guild.findOneAndUpdate(
        { name: guildName, 'raid._id': rosterId },
        { $set: { 'raid.$': newRaidRoster } },
        { new: true, runValidators: true })
        .orFail(() => {throw new NotFound(`Roster doesn't exist`)})
        .then((updatedGuild) => res.status(200).send(updatedGuild))
        .catch((err) => res.status(500).send({ message: 'Error updating guild.', err }))
}


// module.exports.addRaidRoster = (req, res) => {
//     const { id } = req.params
//     const { name, size, characters } = req.body
//     const newRaidRoster = { name, size, characters }

//     Guild.findOneAndUpdate({ name: id, 'raid.name': name }, { $set: { 'raid.$': newRaidRoster } }, { new: true, runValidators: true})
//         .then((guild) => res.status(200).send(guild))
//         .catch((err) => {
//             console.error('Error:', err)
//             res.status(500).send({ message: 'err', err })})
// }

module.exports.getGuilds = (req, res) => {

}