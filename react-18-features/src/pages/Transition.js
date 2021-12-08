import {useState, useTransition} from 'react'

const Transition = () => {
  const [startTransition, isPending] = useTransition({
    timeoutMs: 3000,
  })

  const [numValue, setNumValue] = useState(0)

  console.log(startTransition, isPending)
  return (
    <>
      <div className="container">
        <h1 className="text-center mt-3">Transition</h1>
        <button type="button" onClick={() => setNumValue((curr) => curr + 1)}>
          Add Value
        </button>
        <p>Current Value: {numValue}</p>
      </div>
    </>
  )
}

export default Transition
