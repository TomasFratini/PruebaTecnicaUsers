import './App.css'
import { UsersList } from './components/UsersList'
import useUsers from './hooks/useUsers'

function App () {
  const { loading, toggleShowColors, showColors, deleteUser, sorting, sortUsers, resetState, toggleSortByCountry, filterUsersByCountry, handleChangeSort } = useUsers()

  return (
    <div className='App'>
      <h1>Prueba tecnica</h1>
      <header>
        <button onClick={toggleShowColors}>Colorear filas</button>
        <button onClick={toggleSortByCountry}>
          {sorting === 'COUNTRY' ? 'No ordenar por pais' : 'Ordenar por pais'}
        </button>
        <button onClick={resetState}>Resetear estado</button>
        <input onChange={(e) => { filterUsersByCountry(e.target.value) }} type='text' placeholder='Busque por pais' />
      </header>
      <main>
        {loading
          ? <p>Loading...</p>
          : <UsersList showColors={showColors} users={sortUsers} deleteUser={deleteUser} handleChangeSort={handleChangeSort} />}
      </main>
    </div>
  )
}

export default App
