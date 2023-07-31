[На русском](#guildverse-русский)
[English version](#guildverse-english)

## GuildVerse (English)

GuildVerse is a website that allows tracking detailed information about the participants of upcoming events in the guilds of the online game World of Warcraft. It helps guild leaders to better understand the strength and composition of their groups or raids, including power, role, class, and more.

### Functionality:
- Add/remove guilds to the list of tracked guilds
- Add/remove rosters (groups) for raid activities and dungeon runs
- Add/remove characters to these rosters

### Technologies:
- HTML
- CSS
- React
- Node.js
- Express.js
- MongoDB

### Structure:
Character and guild data are fetched from the open API resource [raider.io](https://raider.io/). When a guild is added to the "tracked" list on the website, a custom API request creates a file in the database with the guild's information. Subsequently, when various groups with characters are added, all this data is stored in the specific guild's file on my server in the database.

---

## GuildVerse (Русский)

GuildVerse - это сайт, позволяющий отслеживать подробную информацию об участниках предстоящих мероприятий в гильдиях онлайн-игры World of Warcraft. Он помогает лидерам гильдий лучше понять силу и состав своих групп или рейдов, включая мощность, роль, класс и другие характеристики.

### Функциональность:
- Добавлять/удалять гильдии в список отслеживаемых
- Добавлять/удалять ростеры (группы) для рейдовых мероприятий и подземелий
- Добавлять/удалять персонажей в эти ростеры

### Технологии:
- HTML
- CSS
- React
- Node.js
- Express.js
- MongoDB

### Структура:
Данные о персонажах и гильдиях берутся с открытого API ресурса [raider.io](https://raider.io/). При добавлении гильдии в список "отслеживаемых" на сайте, через кастомный запрос API создается файл в базе данных с информацией о гильдии. Затем, при добавлении различных групп с персонажами, всё это записывается в файл конкретной гильдии на моем сервере в базу данных.
