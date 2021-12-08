import {Routes, Route} from 'react-router-dom'
import Home from 'pages/Home'
import Navbar from 'components/Navbar'
import Batching from 'pages/Batching'
import 'bootstrap/dist/css/bootstrap.min.css'
import Suspense from 'pages/Suspense'
import Relay from 'pages/Relay'
import Transition from 'pages/Transition'

const App = () => (
  <div>
    <Navbar />

    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/batching" element={<Batching />} />
      <Route path="/suspense" element={<Suspense />} />
      <Route path="/relay" element={<Relay />} />
      <Route path="/transition" element={<Transition />} />
    </Routes>
  </div>
)

export default App
