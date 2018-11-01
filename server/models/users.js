const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Name fields is required'],
    unique: true
  },
  id : Number, 
  probablity: SchemaTypes.Double,
  created_at: {
    type: Date,
    required: true,
    default: Date.now()
  }
})

const User = mongoose.model('User', UserSchema)

module.exports = User