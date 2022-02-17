import {Link} from 'react-router-dom'

const Navbar = () => (
  <>
    <header className="bg-dark text-white p-2">
      <div className="d-flex justify-content-between container align-items-center">
        <h2>React 18 Features</h2>
        <nav className="flex">
          <div>
            <Link to="/" className="text-white">
              {' '}
              Home
            </Link>
          </div>
        </nav>
      </div>
    </header>
  </>
)

export default Navbar
