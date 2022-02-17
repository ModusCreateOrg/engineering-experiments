import React from 'LibMFE/react'
import ReactDOM from 'LibMFE/react-dom'
import 'normalize.css'

import './styles.css'
import { App } from './components/App/App'

ReactDOM.render(
  <div className="base-app-shell">
    <App />
  </div>,
  document.getElementById('root')
)
