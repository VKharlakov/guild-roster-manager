const Character = require('../models/character');
const axios = require('axios');
const roles = ['tank', 'healing', 'dps'];

// Update character function
async function updateCharacter(character) {
    try {
        const response = await axios.get(`https://raider.io/api/v1/characters/profile?region=eu&realm=${character.realm}&name=${character.name}&fields=gear%2Cmythic_plus_scores_by_season%3Acurrent`);
        const data = response.data

        const update = {
            avatar: data.thumbnail_url,
            ilvl: data.gear.item_level_equipped,
            role: data.active_spec_role.toLowerCase(),
            roleId: roles.indexOf(data.active_spec_role.toLowerCase()),
            mythicPlusRaiting: data.mythic_plus_scores_by_season[0].scores.all,
            updatedAt: new Date()
        };

        await Character.findByIdAndUpdate(character._id, update);

        console.log(`Character ${character.name} updated successfully.`);
    } catch (error) {
        console.error(`Error updating character ${character.realm}/ ${character.name}:`, error);
    }
}

// Update characters one by one
async function updateCharactersSequentially(characters) {
    let currentIndex = 0;

    async function updateNextCharacter() {
        if (currentIndex < characters.length) {
            const character = characters[currentIndex];
            await updateCharacter(character);
            currentIndex++;
            setTimeout(updateNextCharacter, 5000);
        } else {
            console.log('All characters updated.');
        }
    }

    updateNextCharacter();
}

// Find all characters from the DB and run update
async function updateAllCharacters() {
    try {
        const characters = await Character.find();
        await updateCharactersSequentially(characters);
    } catch (error) {
        console.error('Error:', error.message);
    }
}

module.exports = {
    updateAllCharacters,
};
