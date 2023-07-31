const express = require('express')
const mongoose = require('mongoose')
const router = require('./routes/router')

const { PORT = 4000 } = process.env

const app = express()

mongoose.connect('mongodb://127.0.0.1/guildversedb')
.then(() => console.log('Успешное подключение к MongoDB'))
.catch(() => console.log('Ошибка подключения к MongoDB'))

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(router)

app.listen(PORT, () => {console.log(`App's listening on port ${PORT}`)})