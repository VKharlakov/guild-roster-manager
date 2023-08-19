const Raid = require('../models/raid')
const MythicPlus = require('../models/mythicPlus')
const Character = require('../models/character')

//  Add Character to Raid
module.exports.addRaidCharacter = (req, res) => {
    const { parentId } = req.body
    Raid.findById(parentId)
        .populate('characters')
        .then((roster) => {
            if (!roster) {
                return res.status(404).send({ message: 'Roster not found' })
            }

            Character.create(req.body)
                .then((newCharacter) => {
                    roster.characters.push(newCharacter)
                    roster.save()
                    return newCharacter
                })
                .then((newCharacter) => {
                    res.status(201).send(newCharacter);
                })
                .catch((err) => {
                    res.status(500).send({ message: 'Could not create and add a character', err })
                })
        })
        .catch((err) => res.status(404).send({ message: 'Roster not found', err }))
}

//  Add Character to MythicPlus
module.exports.addMythicPlusCharacter = (req, res) => {
    const { parentId } = req.body
    MythicPlus.findById(parentId)
        .populate('characters')
        .then((roster) => {
            if (!roster) {
                return res.status(404).send({ message: 'Roster not found' })
            }

            Character.create(req.body)
                .then((newCharacter) => {
                    roster.characters.push(newCharacter)
                    roster.save()
                    return newCharacter
                })
                .then((newCharacter) => {
                    res.status(201).send(newCharacter);
                })
                .catch((err) => {
                    res.status(500).send({ message: 'Could not create and add a character', err })
                })
        })
        .catch((err) => res.status(404).send({ message: 'Roster not found', err }))
}

// Delete Character from Raid
module.exports.deleteRaidCharacter = async (req, res) => {
    const { parentId } = req.body
    try {
        const roster = await Raid.findByIdAndUpdate(
            parentId,
            { $pull: { characters: req.params.characterId } },
            { new: true }
        ).populate('characters');

        if (!roster) {
            return res.status(404).send({ message: 'Roster not found' });
        }

        const deletedCharacter = await Character.findByIdAndDelete(req.params.characterId);

        if (!deletedCharacter) {
            return res.status(404).send({ message: 'Char not found' });
        }

        res.status(200).send(deletedCharacter);
    } catch (err) {
        res.status(500).send({ message: 'Could not delete a character', err });
    }
}

// Delete Character from MythicPlus
module.exports.deleteMythicPlusCharacter = async (req, res) => {
    const { parentId } = req.body
    try {
        const roster = await MythicPlus.findByIdAndUpdate(
            parentId,
            { $pull: { characters: req.params.characterId } },
            { new: true }
        ).populate('characters');

        if (!roster) {
            return res.status(404).send({ message: 'Roster not found' });
        }

        const deletedCharacter = await Character.findByIdAndDelete(req.params.characterId);

        if (!deletedCharacter) {
            return res.status(404).send({ message: 'Char not found' });
        }

        res.status(200).send(deletedCharacter);
    } catch (err) {
        res.status(500).send({ message: 'Could not delete a character', err });
    }
}