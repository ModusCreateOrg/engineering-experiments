import {Link} from 'react-router-dom'

const Navbar = () => (
  <>
    <header className="bg-dark text-white">
      <div className="d-flex justify-content-between container align-items-center">
        <h1>Navbar</h1>
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
