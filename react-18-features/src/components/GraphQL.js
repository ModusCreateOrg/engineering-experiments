/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
import {Suspense} from 'react'
import {
  RelayEnvironmentProvider,
  loadQuery,
  usePreloadedQuery,
} from 'react-relay/hooks'
import RelayEnvironment from 'api/relayEnvironment'
import {graphql} from 'react-relay'

const RepositoryNameQuery = graphql`
  query GraphQLQuery {
    repository(owner: "facebook", name: "relay") {
      name
    }
  }
`

// Immediately load the query as our app starts. For a real app, we'd move this
// into our routing configuration, preloading data as we transition to new routes.
const preloadedQuery = loadQuery(RelayEnvironment, RepositoryNameQuery, {
  /* query variables */
})

const GraphQL = ({preloadedQuery: preQuery}) => {
  // We'll load the name of a repository, initially setting it to null
  const data = usePreloadedQuery(RepositoryNameQuery, preQuery)
  return (
    <div>
      <h1>Simple Query Data by GraphQL</h1>
      <p className="text-center">{data.repository.name}</p>
    </div>
  )
}

const GraphQLRoot = () => {
  return (
    <RelayEnvironmentProvider environment={RelayEnvironment}>
      <Suspense fallback="Loading...">
        <GraphQL preloadedQuery={preloadedQuery} />
      </Suspense>
    </RelayEnvironmentProvider>
  )
}

export default GraphQLRoot
