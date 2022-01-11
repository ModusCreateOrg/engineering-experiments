import React from 'LibMFE/react'
import ReactDOM from 'LibMFE/react-dom'
import 'normalize.css'
import HomePage from 'HomePageMFE/HomePage'

import './styles.css'
import Header from './components/Header/Header'

ReactDOM.render(
  <div className="base-app-shell">
    <Header />
    <HomePage />
  </div>,
  document.getElementById('root')
)
