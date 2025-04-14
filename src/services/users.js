const ENDPOINT_API_URL = 'https://randomuser.me/api?results=100'

export const getUsers = () => {
  return fetch(ENDPOINT_API_URL)
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok')
      }
      return response.json()
    })
    .then((data) => {
      const users = data.results
      return users
    })
    .catch((error) => {
      console.error('There has been a problem with your fetch operation:', error)
      return []
    })
}
