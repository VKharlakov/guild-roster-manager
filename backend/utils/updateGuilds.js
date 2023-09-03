const Guild = require("../models/guild");
const axios = require("axios");

// Update guild function
async function updateGuild(guild) {
  try {
    const response = await axios.get(
      `https://raider.io/api/v1/guilds/profile?region=eu&realm=${guild.realm}&name=${guild.name}&fields=members`
    );
    const data = response.data;

    const update = {
      faction: data.faction,
      members: data.members,
      updatedAt: new Date(),
    };

    await Guild.findByIdAndUpdate(guild._id, update);

    console.log(`Guild ${guild.name} updated successfully.`);
  } catch (error) {
    console.error(`Error updating guild ${guild.realm}/ ${guild.name}:`, error);
  }
}

// Update guilds one by one
async function updateGuildsSequentially(guilds) {
  let currentIndex = 0;

  async function updateNextGuild() {
    if (currentIndex < guilds.length) {
      const guild = guilds[currentIndex];
      await updateGuild(guild);
      currentIndex++;
      setTimeout(updateNextGuild, 5000);
    } else {
      console.log("All guilds updated.");
    }
  }

  updateNextGuild();
}

// Find all guilds from the DB and run update
async function updateAllGuilds() {
  try {
    const guilds = await Guild.find();
    await updateGuildsSequentially(guilds);
  } catch (error) {
    console.error("Error:", error.message);
  }
}

module.exports = {
  updateAllGuilds,
};
