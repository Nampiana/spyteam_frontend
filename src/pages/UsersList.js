import React from "react";
import useUsers from "../hooks/useUsers";  // Selon l'emplacement du fichier


function UsersList() {
  const { users, deleteUser } = useUsers();

  return (
    <div>
      <h2>Liste des Utilisateurs</h2>
      <ul>
        {users.map((user) => (
          <li key={user._id}>
            {user.nom} {user.prenom} - {user.email}
            <button onClick={() => deleteUser(user._id)}>Supprimer</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UsersList;
