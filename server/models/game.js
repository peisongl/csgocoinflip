const mongoose = require('mongoose')
const Schema = mongoose.Schema

const GameSchema = new Schema({

  game_id: Number,
  starter_name: String,
  starter_probability: SchemaTypes.Double,
  start_id: String,

  joiner_name: String,
  joiner_probability: SchemaTypes.Double,
  joiner_id: String,

  created_at: { type: Date, default: Date.now() }
})

const Game = mongoose.model('Game', GameSchema)

module.exports = Game