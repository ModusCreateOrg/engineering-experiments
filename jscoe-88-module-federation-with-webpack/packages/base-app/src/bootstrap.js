import React from 'LibMFE/react'
import ReactDOM from 'LibMFE/react-dom'
import './main.css'
import HomePage from 'HomePageMFE/HomePage'
import Header from './components/Header/Header'

ReactDOM.render(
  <div>
    <Header />
    <HomePage />
  </div>,
  document.getElementById('root')
)
