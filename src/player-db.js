import mongoose from "mongoose";

// Basic Schema for players
const player = new mongoose.Schema({
    name : {                // Name is unique and the only field required
        type : String,
        required : true,
        unique : true
    },
    position : [String],    // Position is a String array, since players can have multiple positions
    number : String,        // Number I set as a String, since it's a face value we'll never do arithmetic with
    salary : Number,        // Salary is a number, since we would be doing arithmetic with it
    stats : [{              // Stats is a list of objects, each containing the name of the stat, and the stat
        type : String,
        value: Number
    }]
})

const Player = mongoose.model('player', player)

// Method to create a new player.
// I don't know if passing a parsed JSON object into .create() will work and needs to be tested
const createPlayer = (playerObj) => {
    return Player.create(JSON.parse(playerObj))
}

// This one needs work, I'm not sure how we want to pass arguments to the function.
// Do we want to just pass the name and value to be changed, or do we want to pass
// A full JSON object with all the values we're not changing undefined? Or, should
// we just pass a complete JSON object that includes the values we're not changing,
// and simply replace the old object with the new one?
const updatePlayer = () => {
}

// Method to delete a player
const deletePlayer = (queryName) => {
    return Player.findOneAndDelete({name: queryName})
        .exec()
}

// Method to get a player
const getPlayer = (queryName) => {
    return Player.find({name : queryName})
        .exec()
}

// Method to get all players
const getAllPlayers = () => {
    return Player.find({})
        .exec()
}

// Exports
module.exports = {
    createPlayer,
    updatePlayer,
    deletePlayer,
    getPlayer,
    getAllPlayers
}
