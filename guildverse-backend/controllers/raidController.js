const Guild = require('../models/guild')
const Raid = require('../models/raidRoster')

// Add raid roster
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
                    return guild.save();
                })
                .then((updatedGuild) => {
                    res.status(200).send(updatedGuild);
                })
                .catch((err) => {
                    res.status(500).send({ message: 'Could not create and add a raid roster', err });
                });
        })
        .catch((err) => {
            res.status(404).send({ message: 'Guild not found', err });
        });
}

// Delete raid roster
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

        const deletedRaid = await Raid.findByIdAndDelete(req.params.raidId);

        if (!deletedRaid) {
            return res.status(404).send({ message: 'Raid not found' });
        }

        res.status(200).send(guild);
    } catch (err) {
        res.status(500).send({ message: 'Could not delete a raid roster', err });
    }
}