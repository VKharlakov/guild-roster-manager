const Guild = require('../models/guild')
const Raid = require('../models/raid')

// Get Raid rosters
module.exports.getRaidRosters = (req, res) => {
    const parentId = req.params.parentId
    Raid.find({ parentId: parentId })
        .populate('characters')
        .then((rosters) => res.status(200).send(rosters))
        .catch((err) => res.status(500).send({ message: 'err', err }))
}

// Add Raid roster
module.exports.addRaidRoster = (req, res) => {
    const { parentId } = req.body
    Guild.findById(parentId)
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
                    res.status(201).send(raidRoster);
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
    const { parentId } = req.body
    try {
        const guild = await Guild.findByIdAndUpdate(
            parentId,
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
        res.status(200).send(raid);

    } catch (err) {
        res.status(500).send({ message: 'Could not delete a Raid roster', err });
    }
}