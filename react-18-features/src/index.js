import {createRoot} from 'react-dom'
import {BrowserRouter} from 'react-router-dom'
import App from './App'
import 'bootstrap/dist/css/bootstrap.min.css'

const container = document.getElementById('app')
// Create a root.
const root = createRoot(container)
// Render the top component to the root.
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
)

module.hot.accept()
