const Guild = require('../models/guild')

// Get Guilds
module.exports.getGuilds = (req, res) => {
    Guild.find({})
        .then((guilds) => res.status(200).send(guilds))
        .catch((err) => res.status(500).send({ message: 'err', err }))
}

// Get current Guild
module.exports.getCurrentGuild = (req, res) => {
    Guild.findById(req.params.guildId)
        .populate('raid')
        .populate('mythicPlus')
        .populate({ path: 'raid', populate: { path: 'characters' } })
        .populate({ path: 'mythicPlus', populate: { path: 'characters' } })
        .then((currentGuild) => res.status(200).send(currentGuild))
        .catch((err) => res.status(500).send({ message: 'err', err }))
}

// Create Guild
module.exports.createGuild = (req, res) => {
    Guild.create(req.body)
        .then((guild) => res.status(201).send(guild))
        .catch((err) => res.status(500).send({ message: 'err', err }))
}

// Delete Guild
module.exports.deleteGuild = async (req, res) => {
    const guild = await Guild.findById(req.params.guildId)
    if (!guild) {
        return res.status(404).send({ message: 'Guild not found' })
    }

    await guild.deleteOne()

    res.status(200).send(guild);
};
