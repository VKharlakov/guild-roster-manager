const Guild = require('../models/guild')
const MythicPlus = require('../models/mythicPlus')

// Add MythicPlus roster
module.exports.addMythicPlusRoster = (req, res) => {
    const { parentId } = req.body
    Guild.findById(parentId)
        .populate('mythicPlus')
        .then((guild) => {
            if (!guild) {
                return res.status(404).send({ message: 'Guild not found' });
            }

            MythicPlus.create(req.body)
                .then((mythicPlusRoster) => {
                    guild.mythicPlus.push(mythicPlusRoster);
                    guild.save();
                    return mythicPlusRoster
                })
                .then((mythicPlusRoster) => {
                    res.status(200).send(mythicPlusRoster);
                })
                .catch((err) => {
                    res.status(500).send({ message: 'Could not create and add a m+ roster', err });
                });
        })
        .catch((err) => {
            res.status(404).send({ message: 'Guild not found', err });
        });
}

// Delete MythicPlus roster
module.exports.deleteMythicPlusRoster = async (req, res) => {
    const { parentId } = req.body
    try {
        const guild = await Guild.findByIdAndUpdate(
            parentId,
            { $pull: { mythicPlus: req.params.mythicPlusId } },
            { new: true }
        )
        if (!guild) {
            return res.status(404).send({ message: 'Guild not found' });
        }

        const mythicPlus = await MythicPlus.findById(req.params.mythicPlusId)
        if (!mythicPlus) {
            return res.status(404).send({ message: 'M+ not found' });
        }

        await mythicPlus.deleteOne()
        res.status(200).send(mythicPlus);

    } catch (err) {
        res.status(500).send({ message: 'Could not delete a M+ roster', err });
    }
}