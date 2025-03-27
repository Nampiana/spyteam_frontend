import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useUsers from "../../hooks/utilisateur/useUsers"; 
import UsersServices from "../../services/utilisateur/UsersService";
import Sidebar from "../templates/sidebar";
import Topbar from "../templates/topbar";
import Footer from "../templates/footer";

function UsersList() {
  const { users, setUsers } = useUsers();
  const navigate = useNavigate();
  const [message, setMessage] = useState(null); // État pour afficher les messages de succès ou d'erreur

  const navigateToCreateUser = () => {
    navigate("/create-user");
  };

  const handleDeleteUser = (userId) => {
    UsersServices.update(userId, { active: 0 })
      .then(() => {
        setUsers(users.map(user => user._id === userId ? { ...user, active: 0 } : user));
        setMessage({ type: "success", text: "Utilisateur supprimé avec succès." });
        
        // Faire disparaître le message après 3 secondes
        setTimeout(() => {
          setMessage(null);
        }, 3000);
      })
      .catch(() => {
        setMessage({ type: "error", text: "Erreur lors de la suppression de l'utilisateur." });
      });
  };

  return (
    <div className="full_container">
      <div className="inner_container">
        <Sidebar />
        <div id="content">
          <Topbar />
          <div className="middle_content">
            <div className="container-fluid">
              <div className="row column_title">
                <div className="col-md-12">
                  <div className="page_title">
                    <h2>Utilisateurs</h2>
                  </div>
                </div>
              </div>
              
              {/* Affichage du message */}
              {message && (
                <div className={`alert ${message.type === "success" ? "alert-success" : "alert-danger"}`} role="alert">
                  {message.text}
                </div>
              )}

              <div className="col-md-12">
                <div className="white_shd full margin_bottom_30">
                  <div className="full graph_head">
                    <div className="heading1 margin_0">
                      <h2>Liste des utilisateurs</h2>
                    </div>
                  </div>
                  <div className="table_section padding_infor_info">
                    <div className="table-responsive-sm">
                      <table className="table">
                        <thead>
                          <tr>
                            <th>Nom</th>
                            <th>Prénom</th>
                            <th>Email</th>
                            <th>Rôle</th>
                            <th>Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {users.map((user) => (
                            <tr key={user._id}>
                              <td>{user.nom}</td>
                              <td>{user.prenom}</td>
                              <td>{user.email}</td>
                              <td>
                                {user.role === 1
                                  ? "Admin"
                                  : user.role === 2
                                  ? "Superviseur"
                                  : user.role === 3
                                  ? "Client"
                                  : "Inconnu"}
                              </td>
                              <td>
                                <button className="btn btn-primary btn-sm" onClick={() => navigate(`/edit-user/${user._id}`)}>Modifier</button>
                                <button className="btn btn-success btn-sm ml-2">Télécharger</button>
                                <button className="btn btn-danger btn-sm ml-2" onClick={() => handleDeleteUser(user._id)}>Supprimer</button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    <div className="text-center mt-3">
                      <button className="btn btn-success btn-sm" onClick={navigateToCreateUser}>
                        Créer Utilisateur
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UsersList;
