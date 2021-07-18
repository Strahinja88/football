import mongoose from 'mongoose'
const Schema = mongoose.Schema
const teamSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  played: {
    type: Number,
    default: 0
  },
  goalsFor: {
    type: Number,
    default: 0
  },
  goalsAgainst: {
    type: Number,
    default: 0
  },
  goalsDifference: {
    type: Number,
    default: 0
  },
  wins: {
    type: Number,
    default: 0
  },
  draws: {
    type: Number,
    default: 0
  },
  losses: {
    type: Number,
    default: 0
  },
  points: {
    type: Number,
    default: 0
  }
}, { timestamps: true })
const Team = mongoose.model('Team', teamSchema)
export default Team