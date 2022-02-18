/* eslint-disable react/prop-types */
const Word = ({findWord, word}) => {
  const index = word.toUpperCase().indexOf(findWord.toUpperCase())

  return index === -1 ? (
    <p className="w-25">{word} </p>
  ) : (
    <p className="w-25">
      {word.slice(0, index)}
      <span className="bg-warning">
        {word.slice(index, index + findWord.length)}
      </span>
      {word.slice(index + findWord.length)}
    </p>
  )
}

export default Word
