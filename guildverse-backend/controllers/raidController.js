const Character = require('../models/character');
const Guild = require('../models/guild')
const Raid = require('../models/raid')

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
        )
        if (!guild) {
            return res.status(404).send({ message: 'Guild not found' });
        }

        const raid = await Raid.findById(req.params.raidId)
        if (!raid) {
            return res.status(404).send({ message: 'Raid not found' });
        }

        await raid.deleteOne()
        res.status(200).send({ message: 'Kaifariki' })

    } catch (err) {
        res.status(500).send({ message: 'Could not delete a M+ roster', err });
    }
}