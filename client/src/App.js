import './App.css'
import React, { useState, useEffect, useMemo } from 'react'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import Navbar from './components/Navbar'
import Results from './components/Results'
import Table from './components/Table'
import NotFound from './components/NotFound'
import { TeamsContext, FixturesContext } from './TeamsContext'
import { getTeams } from './api/index'

function App() {
  const [teams, setTeams] = useState([])
  const [fixtures, setFixtures] = useState(null)

  const teamsPrivider = useMemo(() => ({teams, setTeams}), [teams, setTeams])
  const fixturesProvider = useMemo(() => ({fixtures, setFixtures}), [fixtures, setFixtures])

  useEffect(() => {
    let isMounted = true
    getTeams().then(res => {
      if (isMounted && !teams.length) setTeams(res.data)
    })
    .catch((err) => console.log(err.response))
    return () => { isMounted = false }
  }, [teams])

  return (
    <div className="container">
      <Router>
        <Navbar />
        <TeamsContext.Provider value={teamsPrivider}>
          <FixturesContext.Provider value={fixturesProvider}>
            <Switch>
              <Route exact path="/" component={Results} />
              <Route exact path="/tabela" component={Table} />
              <Route component={NotFound} />
            </Switch>
          </FixturesContext.Provider>
        </TeamsContext.Provider>
      </Router>
    </div>
  )
}

export default App
