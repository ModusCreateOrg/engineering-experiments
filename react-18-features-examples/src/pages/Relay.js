import GraphQL from 'components/GraphQL'

const Relay = () => {
  return (
    <>
      <main className="p-3 d-flex flex-column align-items-center">
        <h1 className="text-center mb-4">React Relay Example</h1>
        <h2 className="text-center mb-4">
          {' '}
          Refresh the page to see the fallback loading component{' '}
        </h2>
        <GraphQL />
      </main>
    </>
  )
}

export default Relay
