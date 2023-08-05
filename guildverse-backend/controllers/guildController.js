const Guild = require('../models/guild')
const Raid = require('../models/raidRoster')

// Get guilds
module.exports.getGuilds = (req, res) => {
    Guild.find({})
        .populate('raid')
        .populate('mythicPlus')
        .then((guilds) => res.status(200).send(guilds))
        .catch((err) => res.status(500).send({ message: 'err', err }))
}

// Create guild
module.exports.createGuild = (req, res) => {
    Guild.create(req.body)
        .then((guild) => res.status(201).send(guild))
        .catch((err) => res.status(500).send({ message: 'err', err }))
}

// Delete guild
module.exports.deleteGuild = (req, res) => {
    Guild.findById(req.params.guildId)
        .then(async (guild) => {

            // Deleting all related raid rosters
            const deletePromises = guild.raid.map(async (rosterID) => {
                try {
                    await Raid.findByIdAndDelete(rosterID);
                } catch (err) {
                    console.error('Error deleting roster:', err);
                }
            });

            // Waiting for completing of rosters deletion
            await Promise.all(deletePromises);

            // Deleting the guild
            Guild.deleteOne(guild)
                .then(() => res.status(200).send(guild))
                .catch((err) => res.status(500).send({ message: 'Guild not deleted', err }));
        })
        .catch((err) => res.status(500).send({ message: 'Guild not found', err }));
}