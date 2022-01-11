import React from 'LibMFE/react'
import {
  HashRouter as Router,
  Routes,
  Route,
  Link
} from 'LibMFE/react-router-dom'
import HomePage from 'HomePageMFE/HomePage'
import ContactPage from 'ContactPageMFE/ContactPage'
import Header from '../Header/Header'

export const App = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route path="/contact" element={<ContactPage />} />
      </Routes>
    </Router>
  )
}
