const Guild = require('../models/guild')
const Raid = require('../models/raidRoster')
const MythicPlus = require('../models/mythicPlusRoster')
const Character = require('../models/character')

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
    try {
        const guild = await Guild.findById(req.params.guildId)

        if (!guild) {
            return res.status(404).send({ message: 'Guild not found' });
        }

        // Deleteing all Characters from Raids
        const deleteRaidCharacterPromises = guild.raid.map(async (roster) => {
            const deletePromises = roster.characters.map(async (character) => {
                try {
                    await Character.findByIdAndDelete(character);
                } catch (err) {
                    console.error('Error deleting character:', err);
                }
            });
            await Promise.all(deletePromises);
        });

        // Deleting all Characters from MythicPlus
        const deleteMythicPlusCharacterPromises = guild.mythicPlus.map(async (roster) => {
            const deletePromises = roster.characters.map(async (character) => {
                try {
                    await Character.findByIdAndDelete(character);
                } catch (err) {
                    console.error('Error deleting character:', err);
                }
            });
            await Promise.all(deletePromises);
        });

        // Deleting all Raids
        const deleteRaidPromises = guild.raid.map(async (roster) => {
            try {
                await Raid.findByIdAndDelete(roster);
            } catch (err) {
                console.error('Error deleting roster:', err);
            }
        });

        // Deleting all MythicPlus
        const deleteMythicPlusPromises = guild.mythicPlus.map(async (roster) => {
            try {
                await MythicPlus.findByIdAndDelete(roster);
            } catch (err) {
                console.error('Error deleting roster:', err);
            }
        });

        // Waiting for completing operations above
        await Promise.all([
            deleteRaidCharacterPromises,
            deleteMythicPlusCharacterPromises,
            deleteRaidPromises,
            deleteMythicPlusPromises
        ]);

        // Deleting the Guild
        await Guild.deleteOne(guild)
            .then(() => res.status(200).send({ message: 'Guild and associated documents deleted successfully' }))
            .catch((err) => res.status(500).send({ message: 'Guild not deleted', err }))

    } catch (err) {
        res.status(500).send({ message: 'Error deleting guild and associated documents', err });
    }
};
