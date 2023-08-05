const Guild = require('../models/guild')
const mythicPlus = require('../models/mythicPlusRoster')

// Add mythic plus roster
module.exports.addMythicPlusRoster = (req, res) => {
    Guild.findById(req.params.guildId)
        .populate('mythicPlus')
        .then((guild) => {
            if (!guild) {
                return res.status(404).send({ message: 'Guild not found' });
            }

            mythicPlus.create(req.body)
                .then((mythicPlusRoster) => {
                    guild.mythicPlus.push(mythicPlusRoster);
                    return guild.save();
                })
                .then((updatedGuild) => {
                    res.status(200).send(updatedGuild);
                })
                .catch((err) => {
                    res.status(500).send({ message: 'Could not create and add a m+ roster', err });
                });
        })
        .catch((err) => {
            res.status(404).send({ message: 'Guild not found', err });
        });
}

// Delete mythic plus roster
module.exports.deleteMythicPlusRoster = async (req, res) => {
    try {
        const guild = await Guild.findByIdAndUpdate(
            req.params.guildId,
            { $pull: { mythicPlus: req.params.mythicPlusId } },
            { new: true }
        ).populate('mythicPlus');

        if (!guild) {
            return res.status(404).send({ message: 'Guild not found' });
        }

        const deletedMythicPlus = await mythicPlus.findByIdAndDelete(req.params.mythicPlusId);

        if (!deletedMythicPlus) {
            return res.status(404).send({ message: 'M+ not found' });
        }

        res.status(200).send(guild);
    } catch (err) {
        res.status(500).send({ message: 'Could not delete a m+ roster', err });
    }
}