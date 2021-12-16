import {useEffect, useState} from 'react'

const Batching = () => {
  const [numberState, setNumberState] = useState(0)
  const [switchState, setSwitchState] = useState(false)
  const [renderState, setRenderState] = useState(0)
  const [data, setData] = useState(null)

  const handleClick = () => {
    console.log('handleClick Event')
    setNumberState((n) => n + 1)
    setSwitchState(!switchState)
  }

  const handleTimeoutClick = () => {
    console.log('time out click')
    setTimeout(() => {
      setNumberState((n) => n + 1)
      setSwitchState(!switchState)
    }, 1500)
  }

  const handleAsyncClick = () => {
    console.log('async click')
    fetch(`${process.env.BASE_URL}/users`)
      .then((res) => res.json())
      .then((d) => {
        setData(d)
        setNumberState((n) => n + 1)
        setSwitchState(!switchState)
      })
  }

  useEffect(() => {
    setRenderState((n) => n + 1)
  }, [])

  console.log('render')

  return (
    <>
      <main className="p-3 container">
        <h2>Batching</h2>
        <div>
          <div className="flex mb-4">
            <button
              className="btn btn-primary me-3"
              type="button"
              onClick={handleClick}
            >
              Click here to increment number and toggle switch together
            </button>
            <button
              className="btn btn-primary me-3"
              type="button"
              onClick={handleTimeoutClick}
            >
              TimeOut Click
            </button>
            <button
              className="btn btn-primary me-3"
              type="button"
              onClick={handleAsyncClick}
            >
              Async Click
            </button>
          </div>
          <p>times number added: {numberState} </p>
          <p>switch currently: {switchState ? 'off' : 'on'} </p>
          <p>times page has rendered: {renderState} </p>

          <p>
            This is a built in feature provided by React where multiple changes
            will not cause more renders, thus improving performance. Here are
            certain cases such as fetching data and setting multiple states and
            delayed clicks.
          </p>

          <h1 className="text-center">Data when Async Click is triggered</h1>
          {data !== null &&
            data.map((user) => (
              <div key={user.name}>
                {user.name} {user.surname}{' '}
              </div>
            ))}
        </div>
      </main>
    </>
  )
}

export default Batching
