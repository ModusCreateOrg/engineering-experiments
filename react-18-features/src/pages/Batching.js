import {useEffect, useState} from 'react'

const Batching = () => {
  const [numberState, setNumberState] = useState(0)
  const [switchState, setSwitchState] = useState(false)
  const [renderState, setRenderState] = useState(0)

  const handleClick = () => {
    setNumberState((n) => n + 1)
    setSwitchState(!switchState)
  }

  useEffect(() => {
    setRenderState((n) => n + 1)
  }, [numberState, switchState])
  return (
    <>
      <main className="p-3">
        <h2>Batching</h2>
        <div>
          <div className="flex mb-4">
            <button
              className="btn btn-primary"
              type="button"
              onClick={handleClick}
            >
              Click here to increment number anmd toggle switch together
            </button>
          </div>
          <p>times number switched: {numberState} </p>
          <p>switch currently: {switchState ? 'off' : 'on'} </p>
          <p>times page has rendered: {renderState} </p>

          <p>
            This is a built in feature provided by React where multiple changes
            will not cause more renders, thus improving performance
          </p>
        </div>
      </main>
    </>
  )
}

export default Batching
