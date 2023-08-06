const Character = require('../models/character');
const Guild = require('../models/guild')
const Raid = require('../models/raidRoster')

// Add Raid roster
module.exports.addRaidRoster = (req, res) => {
    Guild.findById(req.params.guildId)
        .populate('raid')
        .then((guild) => {
            if (!guild) {
                return res.status(404).send({ message: 'Guild not found' });
            }

            Raid.create(req.body)
                .then((raidRoster) => {
                    guild.raid.push(raidRoster);
                    guild.save();
                    return raidRoster
                })
                .then((raidRoster) => {
                    res.status(200).send(raidRoster);
                })
                .catch((err) => {
                    res.status(500).send({ message: 'Could not create and add a raid roster', err });
                });
        })
        .catch((err) => {
            res.status(404).send({ message: 'Guild not found', err });
        });
}

// Delete Raid roster
module.exports.deleteRaidRoster = async (req, res) => {
    try {
        const guild = await Guild.findByIdAndUpdate(
            req.params.guildId,
            { $pull: { raid: req.params.raidId } },
            { new: true }
        ).populate('raid');
        if (!guild) {
            return res.status(404).send({ message: 'Guild not found' });
        }

        const raid = await Raid.findById(req.params.raidId)
        if (!raid) {
            return res.status(404).send({ message: 'Raid not found' });
        }

        const deleteCharactersPromises = raid.characters.map(async (character) => {
            try {
                await Character.findByIdAndDelete(character)
            } catch (err) {
                console.error('Error deleting roster:', err)
            }
        })

        await Promise.all(deleteCharactersPromises)

        await Raid.deleteOne(raid)
            .then(() => res.status(200).send(guild.raid))
            .catch((err) => res.status(500).send({ message: 'Roster not deleted', err }));

    } catch (err) {
        res.status(500).send({ message: 'Could not delete a raid roster', err });
    }
}