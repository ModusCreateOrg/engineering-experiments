import {Link} from 'react-router-dom'

const Home = () => (
  <>
    <main className="container">
      <h2 className="text-center mb-3">Welcome to the homepage!</h2>
      <p>
        We will be looking at all of the react 18 features. Here is a list of
        features:
      </p>

      <ol>
        <li>
          Batching <Link to="/batching">Click Here</Link>
        </li>
        <li>
          Batching <Link to="/batching">Click Here</Link>
        </li>
      </ol>
    </main>
  </>
)

export default Home
