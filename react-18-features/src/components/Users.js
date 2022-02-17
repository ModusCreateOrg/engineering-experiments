import db from 'api/db.json'

const Users = () => {
  return (
    <>
      <h3>Users</h3>
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

export default Users
