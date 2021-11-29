import {createRoot} from 'react-dom'
import App from './App'

const container = document.getElementById('app')
// Create a root.
const root = createRoot(container)
// Render the top component to the root.
root.render(<App />)

module.hot.accept()
