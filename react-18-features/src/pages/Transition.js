/* eslint-disable no-unused-vars */
import {useTransition, useState} from 'react'
import Word from 'components/Word'
import randomWords from 'random-words'

const names = randomWords(7000).map((word, index) => `${word}${index}`)

const Transition = () => {
  const [isPending, startTransition] = useTransition({timeoutMs: 100})

  const [isTransition, setIsTransition] = useState(false)

  const [findWord, setfindWord] = useState('')
  const [uiWord, setUiWord] = useState('')

  const handleChange = ({target: {value}}) => {
    setfindWord(value)
    if (isTransition) {
      startTransition(() => {
        setUiWord(value)
      })
    }
  }
  return (
    <>
      (
      <div className="container">
        <h1 className="text-center mt-3">Transition</h1>
        <h2 className="">List of Names Example</h2>
        <h2>pending? {isPending ? 'yes' : 'no'} </h2>
        <p>
          When useTransition is used to set the state, it will first priortize
          the input rather than the UI. By default, with no transition, the word
          and the highlighted word are both priortize and updated around the
          same time.
        </p>
        <button
          type="button"
          className={`border-0 p-1 text-white me-3 rounded ${
            isTransition ? 'bg-success' : 'bg-danger'
          }`}
          onClick={() => setIsTransition((curr) => !curr)}
        >
          {' '}
          Transition is {isTransition ? ' on' : 'off'}
        </button>
        <input
          onChange={handleChange}
          type="text"
          value={findWord}
          placeholder="Enter some letters here"
        />
        <div className="d-flex flex-wrap">
          {names.map((name) => (
            <Word
              findWord={isTransition ? uiWord : findWord}
              word={name}
              key={name}
            />
          ))}
        </div>
      </div>
    </>
  )
}

export default Transition
