/* eslint-disable consistent-return */
/* eslint-disable import/prefer-default-export */
// function delay(delayInms) {
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       resolve(2)
//     }, delayInms)
//   })
// }

export async function fetchUsers() {
  const response = await fetch(`${process.env.BASE_URL}/users`)
  const json = await response.json()
  return json
}

function setPromise(promise) {
  let status = 'pending'
  let result
  const suspender = promise.then(
    (r) => {
      status = 'success'
      result = r
    },
    (e) => {
      status = 'error'
      result = e
    },
  )
  return {
    read() {
      if (status === 'pending') {
        throw suspender
      } else if (status === 'error') {
        throw result
      } else if (status === 'success') {
        return result
      }
    },
  }
}

export const fetchUsersMock = () => {
  return setPromise(fetchUsers())
}
