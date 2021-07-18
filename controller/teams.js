import mongoose from 'mongoose'
import Team from '../models/teams.js'

export const readTeams = async (req, res) => {
  try {
    const teams = await Team.find()
    res.status(200).json(teams)
  } catch(err) {
    res.status(404).json({error: err.message})
  }
}

export const createTeam = async (req, res) => {
  const team = new Team(req.body)
  try {
    await team.save()
    res.status(201).json(team)
  } catch(err) {
    res.status(409).json({error: err.message})
  }
}