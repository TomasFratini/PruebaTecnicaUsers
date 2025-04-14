export function UsersList ({ users, showColors, deleteUser }) {
  return (

    <table className='table'>
      <thead>
        <tr>
          <th>Foto</th>
          <th>Nombre</th>
          <th>Apellido</th>
          <th>Pais</th>
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
