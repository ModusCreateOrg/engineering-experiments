import {Suspense as ReactSuspense, lazy} from 'react'
import FallBack from 'components/FallBack'
// import Users from 'components/Users'
import wait from 'waait'

const Users = lazy(async () => {
  // mock some latency
  await wait(2000)
  // show when component has loaded
  return import('../components/Users')
})

const Suspense = () => {
  return (
    <>
      <main className="p-3 d-flex flex-column align-items-center">
        <h1 className="text-center mb-4">Suspense and Lazy Load</h1>

        <ReactSuspense fallback={<FallBack />}>
          <Users />
        </ReactSuspense>
      </main>
    </>
  )
}

export default Suspense
