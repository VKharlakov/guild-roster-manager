const Guild = require('../models/guild')
const MythicPlus = require('../models/mythicPlusRoster')
const Character = require('../models/character')

// Add MythicPlus roster
module.exports.addMythicPlusRoster = (req, res) => {
    Guild.findById(req.params.guildId)
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
    try {
        const guild = await Guild.findByIdAndUpdate(
            req.params.guildId,
            { $pull: { mythicPlus: req.params.mythicPlusId } },
            { new: true }
        ).populate('mythicPlus');
        if (!guild) {
            return res.status(404).send({ message: 'Guild not found' });
        }

        const mythicPlus = await MythicPlus.findById(req.params.mythicPlusId)
        if (!mythicPlus) {
            return res.status(404).send({ message: 'M+ not found' });
        }

        const deleteCharactersPromises = mythicPlus.characters.map(async (character) => {
            try {
                await Character.findByIdAndDelete(character)
            } catch (err) {
                console.error('Error deleting roster:', err)
            }
        })

        await Promise.all(deleteCharactersPromises)

        await MythicPlus.deleteOne(mythicPlus)
            .then(() => res.status(200).send(guild.mythicPlus))
            .catch((err) => res.status(500).send({ message: 'Roster not deleted', err }));

    } catch (err) {
        res.status(500).send({ message: 'Could not delete a M+ roster', err });
    }
}