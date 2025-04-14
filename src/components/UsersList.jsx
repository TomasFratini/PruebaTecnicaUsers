export function UsersList ({ users, showColors, deleteUser, handleChangeSort }) {
  return (

    <table className='table'>
      <thead>
        <tr>
          <th>Foto</th>
          <th className='pointer' onClick={() => { handleChangeSort('NAME') }}>Nombre</th>
          <th className='pointer' onClick={() => { handleChangeSort('LAST') }}>Apellido</th>
          <th className='pointer' onClick={() => { handleChangeSort('COUNTRY') }}>Pais</th>
          <th>Accion</th>
        </tr>
      </thead>
      <tbody className={showColors ? 'table--showColors' : ''}>
        {users.map(user => (
          <tr key={user.email}>
            <td>
              <img src={user.picture.thumbnail} />
            </td>
            <td>{user.name.first}</td>
            <td>{user.name.last}</td>
            <td>{user.location.country}</td>
            <td>
              <button onClick={() => { deleteUser(user.email) }}>Borrar</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>

  )
}
