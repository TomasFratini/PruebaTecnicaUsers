import { useState, useEffect, useRef } from 'react'
import { getUsers } from '../services/users.js'

const useUsers = () => {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [showColors, setShowColors] = useState(false)
  const [sorting, setSorting] = useState(null)
  const [searchCountry, setSearchCountry] = useState('')
  const originalUsers = useRef([])

  const filterByCountry = searchCountry
    ? users.filter(user => user.location.country.toLowerCase().includes(searchCountry.toLowerCase()))
    : users

  const sortUsers = sorting
    ? [...filterByCountry].sort((a, b) => {
        return a.location.country.localeCompare(b.location.country)
      })
    : filterByCountry

  const changeSorting = (field) => {

  }

  const filterUsersByCountry = (country) => {
    setSearchCountry(country)
  }

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const users = await getUsers()
        setUsers(originalUsers.current = users)
      } catch (err) {
        setError(err)
      } finally {
        setLoading(false)
      }
    }
    fetchUsers()
  }, [])

  const deleteUser = (email) => {
    const newUsers = users.filter(user => user.email !== email)
    setUsers(newUsers)
  }

  const toggleShowColors = () => {
    setShowColors(!showColors)
  }

  const resetState = () => {
    setUsers(originalUsers.current)
  }

  const toggleSortByCountry = () => {
    const newSortingValue = sorting === null ? 'country' : null
    setSorting(newSortingValue)
  }

  return {
    loading,
    error,
    showColors,
    sortUsers,
    sorting,
    toggleShowColors,
    deleteUser,
    resetState,
    toggleSortByCountry,
    filterUsersByCountry,
    filterByCountry
  }
}

export default useUsers
