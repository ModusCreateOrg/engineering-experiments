import {Link} from 'react-router-dom'

const Home = () => (
  <>
    <main>
      <h2>Welcome to the homepage!</h2>
      <p>
        We will be looking at all of the react 18 features. Here is a list of
        features:
      </p>

      <ol>
        <li>
          Batching <Link to="/batching">Click Here</Link>
        </li>
      </ol>
    </main>
  </>
)

export default Home
