import { useEffect, useState } from "react";
import UsersServices from "../../services/utilisateur/UsersService";

function useUsers() {
  const [users, setUsers] = useState([]);

  function fetchUsers() {
    UsersServices.getAll()
      .then((res) => {
        console.log("Données reçues :", res.data); // Vérifie la structure
        if (Array.isArray(res.data.data)) {
          setUsers(res.data.data); // Assurez-vous de récupérer le tableau
        } else {
          console.error("La réponse de l'API n'est pas un tableau.");
        }
      })
      .catch((err) => console.error("Erreur API :", err));
  }
  

  useEffect(() => {
    fetchUsers();
  }, []);

  const createUser = (data, callback = () => {}) => {
    UsersServices.create(data)
      .then(() => {
        fetchUsers();
        callback();
      })
      .catch((err) => console.error(err));
  };

  const updateUser = (id, data, callback = () => {}) => {
    UsersServices.update(id, data)
      .then(() => {
        fetchUsers();
        callback();
      })
      .catch((err) => console.error(err));
  };

  const deleteUser = (id, callback = () => {}) => {
    UsersServices.delete(id)
      .then(() => {
        fetchUsers();
        callback();
      })
      .catch((err) => console.error(err));
  };

  return { users, createUser, updateUser, deleteUser };
}

export default useUsers;
