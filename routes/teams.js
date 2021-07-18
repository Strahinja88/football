import express from 'express'
import { readTeams, createTeam } from '../controller/teams.js'

const router = express.Router()
router.get('/', readTeams)
router.post('/', createTeam)

export default router