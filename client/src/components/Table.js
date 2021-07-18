import React, { useContext } from 'react'
import { TeamsContext } from '../TeamsContext.js'

export default function Table() {
  const { teams } = useContext(TeamsContext)

  const sortTeams = teams => {
    return teams.sort((a, b) => b.points - a.points ||
    b.goalsDifference - a.goalsDifference ||
    b.wins - a.wins ||
    a.losses - b.losses ||
    b.goalsFor - a.goalsFor ||
    a.name.localeCompare(b.name))
  }

  return (
    <table className="table table-striped">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Team name</th>
          <th scope="col">P</th>
          <th scope="col">W</th>
          <th scope="col">D</th>
          <th scope="col">L</th>
          <th scope="col">F</th>
          <th scope="col">A</th>
          <th scope="col">GD</th>
          <th scope="col">PTS</th>
        </tr>
      </thead>
      <tbody>
        {sortTeams(teams).map((team, index) =>
          <tr key={team._id}>
            <th scope="row">{index + 1}</th>
            <td>{team.name}</td>
            <td>{team.played}</td>
            <td>{team.wins}</td>
            <td>{team.draws}</td>
            <td>{team.losses}</td>
            <td>{team.goalsFor}</td>
            <td>{team.goalsAgainst}</td>
            <td>{team.goalsDifference}</td>
            <td>{team.points}</td>
          </tr>
        )}
      </tbody>
    </table>
  )
}
