import db from 'api/db.json'

const Comments = () => {
  return (
    <>
      <h3>Comments</h3>
      <ol>
        {db.users.map((user) => (
          <li key={user}>
            {user.name} {user.surname}
          </li>
        ))}
      </ol>
    </>
  )
}

export default Comments
