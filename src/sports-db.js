// Imports
import koa from 'koa'
//import morgan from 'morgan'
import db from './player-db'
import mongoose from "mongoose";
const {urlencoded, json} = require('koa-body-parser')

// Setting everything up
const app = koa()
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

// Update a new player
// The updatePlayer method needs to be finished, not sure how we want to provide arguments
// Returns 201 if successful, 204 error if player not added
app.patch('updatePlayer', async (req, res) => {
    const updatedPlayer = await db.updatePlayer(req.body)
    if (updatedPlayer)
        res.status(302)
    else
        res.error(418)
})

// Method to connect to server, right now just set up to local host but later will be transferred to Atlas
const connect = () => {
    return mongoose.connect('mongodb://localhost:27017/player-db')// Eventually replace with Atlas URL
}

// Connect to server. Changes need to be made here before exporting to Atlas
connect()
    .then(async connection => {
        console.log('Server connected')
        app.listen(8000)
    })
    .catch(e => console.error(e))