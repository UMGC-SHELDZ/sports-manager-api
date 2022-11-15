// Imports
import express from 'express'
import morgan from 'morgan'
import db from './player-db'
const {urlencoded, json} = require('body-parser')

// Setting everything up
const app = express()
app.use(morgan('dev'))
app.use(urlencoded({extended : true}))
app.use(json())

// Get a player by name
// Requires the name be in the request body
// Returns a JSON object
app.get('/getPlayer', async (req, res) => {
    const player = await db.getPlayer(req.body.name)
    res.status(200).json(player)
})

// Get all players
// Returns a list of JSON objects
app.get('/getPlayers', async (req, res) => {
    const players = await db.getAllPlayers()
    res.status(200).json(players)
})

// Delete a player by name
// Requires the name be in the request body
// Returns 204 if successful, 404 error if player not found
app.delete('/deletePlayer', async (req, res) => {
    const deletedPlayer = db.deletePlayer(req.body.name)
    if(deletedPlayer)
        res.status(204)
    else
        res.error(404)
})

// Adds a new player
// Requires JSON object in body
// Returns 201 if successful, 204 error if player not added
app.post('/addPlayer', async (req, res) => {
    const newPlayer = await db.createPlayer(req.body)
    if (newPlayer)
        res.status(201)
    else
        res.error(204)
})
