import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import cors from 'cors'
import teamsRoutes from './routes/teams.js'

const app = express()
dotenv.config()
app.use(express.json({ extended: true }))
app.use(express.urlencoded({ extended: true }))
app.use(cors())
app.use('/teams', teamsRoutes)

app.get('/', (req, res) => {
  res.send('Welcome to server')
})

const CONNECTION_URL = 'mongodb+srv://Strahinja:Strahinja88@cluster0.k2rjc.mongodb.net/football-league?retryWrites=true&w=majority'
const PORT = process.env.PORT || 5000
mongoose.connect(CONNECTION_URL, {useNewUrlParser: true, useUnifiedTopology: true})
  .then(() => app.listen(PORT, () => console.log(`Server running on port: ${PORT}`)))
  .catch(err => console.log(err.message))