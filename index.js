const express = require('express');
const server = express();
const bot = require('./jogo');
const botOntem = require('./jogo-ontem');
const botAgora = require('./jogo-online');
const botData = require('./jogo-data');

//Cors Configuration - Start
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*")
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested, Content-Type, Accept Authorization"
    )
    if (req.method === "OPTIONS") {
        res.header(
            "Access-Control-Allow-Methods",
            "POST, PUT, PATCH, GET, DELETE"
        )
        return res.status(200).json({})
    }
    next()
})
//Cors Configuration - End

const port = process.env.PORT || 3000;

server.get('/', async (req, res) => {
    const response = await bot();
    res.send(response);
})

server.get('/ontem', async (req, res) => {
    const response = await botOntem();
    res.send(response);
})

server.get('/agora', async (req, res) => {
    const response = await botAgora();
    res.send(response);
})

server.get('/data/:data', async (req, res) => {
    const data = req.params.data;
    const response = await botData(data);
    res.send(response);
})

server.listen(port, () => {
    console.log("Servidor funcionando!");
})
