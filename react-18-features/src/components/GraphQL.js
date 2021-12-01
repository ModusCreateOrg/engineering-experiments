/* eslint-disable react-hooks/exhaustive-deps */
import fetchGraphQL from 'api/fetchGraphQLData'
import {useEffect, useState} from 'react'

const GraphQL = () => {
  // We'll load the name of a repository, initially setting it to null
  const [name, setName] = useState(null)

  // When the component mounts we'll fetch a repository name
  useEffect(() => {
    let isMounted = true
    fetchGraphQL(`
      query RepositoryNameQuery {
        # feel free to change owner/name here
        repository(owner: "facebook" name: "relay") {
          name
        }
      }
    `)
      .then((response) => {
        // Avoid updating state if the component unmounted before the fetch completes
        if (!isMounted) {
          return
        }
        const {data} = response
        setName(data.repository.name)
      })
      .catch((error) => {
        console.error(error)
      })

    return () => {
      isMounted = false
    }
  }, [fetchGraphQL])

  // Render "Loading" until the query completes
  return (
    <div>
      <p>{name != null ? `Repository: ${name}` : 'Loading'}</p>
    </div>
  )
}

export default GraphQL
