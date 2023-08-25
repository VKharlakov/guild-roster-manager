const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
// const cron = require('node-cron');
const router = require('./routes/router');
// const { updateAllCharacters } = require('./utils/utils');

const { PORT = 3000 } = process.env

const app = express()

mongoose.connect('mongodb://127.0.0.1/guildversedb')
    .then(() => console.log('Успешное подключение к MongoDB'))
    .catch(() => console.log('Ошибка подключения к MongoDB'))

// cron.schedule('*/10 * * * * *', () => {
//     updateAllCharacters()
// });

app.use('*', cors([
    'localhost:3000',
    'http://localhost:3000',
    'https://localhost:3000',
    'http://raider.io',
    'https://raider.io',
    'http://guildrm.com',
    'https://guildrm.com',
]))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(router)

app.listen(PORT, () => { console.log(`App's listening on port ${PORT}`) })