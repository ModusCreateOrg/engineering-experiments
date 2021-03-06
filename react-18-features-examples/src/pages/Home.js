import {Link} from 'react-router-dom'

const Home = () => (
  <>
    <main className="container">
      <h1 className="text-center mb-3">Welcome to the homepage!</h1>
      <p>
        We will be looking at all of the react 18 features. Here is a list of
        features:
      </p>

      <ol>
        <li>
          Batching Feature <Link to="/batching"> Click Here</Link>
        </li>
        <li>
          Suspense and Lazy Load Feature <Link to="/suspense"> Click Here</Link>
        </li>
        <li>
          Suspense in Action with React Relay
          <Link to="/relay"> Click Here</Link>
        </li>
        <li>
          Use Transition Hook
          <Link to="/transition"> Click Here</Link>
        </li>
        <li>
          Use Mutable Source Hook
          <Link to="/mutable"> Click Here</Link>
        </li>
      </ol>
    </main>
  </>
)

export default Home
