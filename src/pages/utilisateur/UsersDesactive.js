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

  const handleActiveUser = (userId) => {
    UsersServices.update(userId, { active: 1 })
      .then(() => {
        setUsers(users.map(user => user._id === userId ? { ...user, active: 1 } : user));
        setMessage({ type: "success", text: "Utilisateur activer avec succès." });
        
        // Faire disparaître le message après 3 secondes
        setTimeout(() => {
          setMessage(null);
        }, 2000);
      })
      .catch((error) => {
        setMessage({ type: "error", text: "Erreur lors de la suppression de l'utilisateur." });
        console.error("Erreur lors de l'activation de l'utilisateur :", error);
        setTimeout(() => {
          setMessage(null);
        }, 2000);
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
                      <h2>Liste des utilisateurs désactiver</h2>
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
                          {users
                          .filter(user => user.active === 0)
                          .map((user) => (
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
                                <button className="btn btn-danger btn-sm ml-2" onClick={() => handleActiveUser(user._id)}>Activer</button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
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
