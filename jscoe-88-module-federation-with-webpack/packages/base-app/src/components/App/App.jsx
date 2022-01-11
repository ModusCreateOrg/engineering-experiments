import React from 'LibMFE/react'
import {
  HashRouter as Router,
  Routes,
  Route,
  Link
} from 'LibMFE/react-router-dom'
import HomePage from 'HomePageMFE/HomePage'
import Header from '../Header/Header'

export const App = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route exact path="/" element={<HomePage />} />
      </Routes>
    </Router>
  )
}
