import React, { useState, useEffect, useContext } from 'react'
import { TeamsContext, FixturesContext } from '../TeamsContext.js'
import { getTeams } from '../api/index'
import moment from 'moment'

export default function Results() {
  const [finished, setFinished] = useState(false)

  const { teams, setTeams } = useContext(TeamsContext)
  const { fixtures, setFixtures } = useContext(FixturesContext)

  useEffect(() => {
    isFinished()
  })

  const tournament = () => {
    const n = teams.length
    const tournament = []

    for (var r = 1; r < n; r++) {
      const pairs = []
      for (let i = 1; i <= n/2; i++) {
        if (i === 1) {
          pairs.push([{...teams[0]}, {...teams[((n-1+r-1) % (n-1) + 2) - 1]}])
        } else {
          pairs.push([{...teams[((r+i-2) % (n-1) + 2) - 1]}, {...teams[((n-1+r-i) % (n-1) + 2) - 1]}])
        }
      }
      tournament.push({
        round: r,
        date: r === 1 ? moment().format('L') : moment().add(7 * (r - 1), 'days').format('L'),
        played: false,
        pairs
      })
    }
    setFixtures(tournament)
  }

  const playRound = (round, index) => {
    const newFixtures = fixtures
    const newTeams = [...teams]
    round.played = true
    round.pairs.forEach(pair => {
      const homeGoals = (Math.floor(Math.random() * 6))
      const awayGoals = (Math.floor(Math.random() * 6))
      pair[0].goalsFor = pair[1].goalsAgainst = homeGoals
      pair[0].goalsAgainst = pair[1].goalsFor = awayGoals
      pair.forEach(team => {
        team.played = 1
        team.goalsDifference = team.goalsFor - team.goalsAgainst
        if (team.goalsDifference > 0) {
          team.wins += 1
          team.points += 3
        } else if (team.goalsDifference === 0) {
          team.draws += 1
          team.points += 1
        } else {
          team.losses += 1
        }
        newTeams.forEach(tableTeam => {
          if (tableTeam._id === team._id) {
            tableTeam.played += 1
            tableTeam.wins += team.wins
            tableTeam.draws += team.draws
            tableTeam.losses += team.losses
            tableTeam.points += team.points
            tableTeam.goalsFor += team.goalsFor
            tableTeam.goalsAgainst += team.goalsAgainst
            tableTeam.goalsDifference += team.goalsDifference
          }
        })
      })
    })
    newFixtures[index] = round
    setFixtures(newFixtures)
    setTeams(newTeams)
    isFinished()
  }

  const isFinished = () => {
    if (!fixtures) return
    const finished = fixtures.every(round => round.played)
    if (fixtures && finished) {
      setFinished(true)
    }
  }

  const resetTable = () => {
    getTeams().then(res => {
      setTeams(res.data)
    })
    .catch((err) => console.log(err.response))
  }

  const resetTournament = () => {
    setFixtures(null)
    setFinished(false)
    resetTable()
  }

  return (
    <div className="text-center my-3">
      {!fixtures && <button className="btn btn-primary" onClick={tournament}>
        Napravi raspored
      </button>}
      {fixtures && fixtures.map((round, roundIndex) =>
      <div key={`round+${roundIndex}`} className="col-lg-6 offset-lg-3 my-3">
        <div className="bg-dark text-white p-2">{`${roundIndex + 1}. kolo - ${round.date}`}</div>
        <div className="card bg-light">
          {round.pairs.map((team, teamIndex) =>
          <ul key={`team+${teamIndex}`} className="list-group list-group-flush">
            <li className="list-group-item bg-light d-flex align-items-center">
              <span className="text-right" style={{width: round.played ? '42%' : '45%'}}>{team[0].name}</span>
              {round.played ?
              <div style={{width: '16%'}}>
                <span className="py-1 bg-warning">
                  <strong className="ml-2">{team[0].goalsFor}</strong> -
                  <strong className="mr-2"> {team[1].goalsFor}</strong>
                </span>
              </div> : <strong style={{width: '10%'}}> - </strong>}
              <span className="text-left" style={{width: round.played ? '42%' : '45%'}}>{team[1].name}</span>
            </li>
          </ul>
          )}
          {((fixtures[roundIndex - 1] && fixtures[roundIndex - 1].played && !fixtures[roundIndex].played) ||
          (roundIndex === 0 && !round.played)) &&
          <button className="btn btn-primary" onClick={() => playRound(round, roundIndex)}>
            Odigraj kolo
          </button>}
        </div>
      </div>
      )}
      {finished && <button className="btn btn-primary" onClick={resetTournament}>
        Igraj ponovo
      </button>}
    </div>
  )
}
