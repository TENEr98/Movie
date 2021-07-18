import React, { useState } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import MovieDetails from './components/MovieDetails'
import MovieList from './components/MovieList'

import './App.scss'

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={MovieList} />
        <Route path="/:id" component={MovieDetails} />
      </Switch>
    </Router>
  )
}

export default App
