import { useState, useEffect, useRef, useMemo } from 'react'
import { getUsers } from '../services/users.js'

const useUsers = () => {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [showColors, setShowColors] = useState(false)
  const [sorting, setSorting] = useState(null)
  const [searchCountry, setSearchCountry] = useState('')
  const originalUsers = useRef([])

  const compareProperties = {
    NONE: null,
    COUNTRY: user => user.location.country,
    NAME: user => user.name.first,
    LAST: user => user.name.last
  }
  const toggleSortByCountry = () => {
    const newSortingValue = sorting === null ? 'COUNTRY' : null
    setSorting(newSortingValue)
  }

  const handleChangeSort = (sort) => {
    if (sort === sorting) {
      setSorting(null)
      return
    }
    setSorting(sort)
  }
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

  const filterByCountry = useMemo(() => {
    return searchCountry != null && searchCountry.length > 0

      ? users.filter(user => user.location.country.toLowerCase().includes(searchCountry.toLowerCase()))
      : users
  }, [users, searchCountry])

  const sortUsers = useMemo(() => {
    if (sorting === compareProperties.NONE) return filterByCountry

    return filterByCountry.toSorted((a, b) => {
      const extractProperty = compareProperties[sorting]
      return extractProperty(a).localeCompare(extractProperty(b))
    })
  }, [sorting, filterByCountry])

  const filterUsersByCountry = (country) => {
    setSearchCountry(country)
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
    filterByCountry,
    handleChangeSort,
    compareProperties
  }
}

export default useUsers
