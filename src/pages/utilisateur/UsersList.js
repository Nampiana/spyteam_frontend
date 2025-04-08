import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useUsers from "../../hooks/utilisateur/useUsers";
import Sidebar from "../templates/sidebar";
import Topbar from "../templates/topbar";
import Footer from "../templates/footer";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

function UsersList() {
  const { users, setUsers, updateUser, generateFile, getOneUser } = useUsers();
  const navigate = useNavigate();
  const [message, setMessage] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 5;

  const [isBuilding, setIsBuilding] = useState(
    localStorage.getItem("isBuilding") === "true"
  );

  // Met à jour le localStorage à chaque changement
  useEffect(() => {
    localStorage.setItem("isBuilding", isBuilding);
  }, [isBuilding]);

  // ⚠️ Vérifie au mount si un build est en cours
  useEffect(() => {
    const buildingUserId = localStorage.getItem("buildingUserId");
    if (isBuilding && buildingUserId) {
      const intervalId = setInterval(() => {
        getOneUser(buildingUserId, (userData) => {
          if (userData?.data?.buildStatus === "done") {
            clearInterval(intervalId);
            setIsBuilding(false);
            localStorage.setItem("isBuilding", "false");
            localStorage.removeItem("buildingUserId");

            // Met à jour localement l'utilisateur
            setUsers((prevUsers) =>
              prevUsers.map((user) =>
                user._id === buildingUserId
                  ? { ...user, buildStatus: "done" }
                  : user
              )
            );
          }
        });
      }, 5000);

      return () => clearInterval(intervalId); // Nettoyage si le composant démonte
    }
  }, [isBuilding, getOneUser, setUsers]);

  const navigateToCreateUser = () => {
    navigate("/create-user");
  };

  const handleDeleteUser = (userId) => {
    confirmAlert({
      title: "Confirmation",
      message: "Êtes-vous sûr de vouloir supprimer cet utilisateur ?",
      buttons: [
        {
          label: "Oui",
          onClick: () => {
            updateUser(userId, { active: 0 }, () => {
              setUsers((prevUsers) =>
                prevUsers.map((user) =>
                  user._id === userId ? { ...user, active: 0 } : user
                )
              );
              setMessage({
                type: "success",
                text: "Utilisateur supprimé avec succès.",
              });

              setTimeout(() => {
                setMessage(null);
              }, 2000);
            });
          },
        },
        {
          label: "Non",
        },
      ],
    });
  };

  const handleGenerateFile = (userId) => {
    if (isBuilding) return;

    setIsBuilding(true);
    localStorage.setItem("isBuilding", "true");
    localStorage.setItem("buildingUserId", userId);

    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user._id === userId ? { ...user, buildStatus: "building" } : user
      )
    );

    updateUser(userId, { buildStatus: "building" }, () => {
      const data = { clientId: userId };
      generateFile(data);

      const intervalId = setInterval(() => {
        getOneUser(userId, (userData) => {
          if (userData?.data?.buildStatus === "done") {
            clearInterval(intervalId);
            setIsBuilding(false);
            localStorage.setItem("isBuilding", "false");
            localStorage.removeItem("buildingUserId");

            setUsers((prevUsers) =>
              prevUsers.map((user) =>
                user._id === userId
                  ? { ...user, buildStatus: "done" }
                  : user
              )
            );
          }
        });
      }, 5000);
    });
  };

  const activeUsers = users.filter((user) => user.active === 1);
  const totalPages = Math.ceil(activeUsers.length / usersPerPage);
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = activeUsers.slice(indexOfFirstUser, indexOfLastUser);

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const goToPrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
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

              {message && (
                <div
                  className={`alert ${
                    message.type === "success"
                      ? "alert-success"
                      : "alert-danger"
                  }`}
                  role="alert"
                >
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
                          {currentUsers.map((user) => (
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
                                <button
                                  className="btn btn-primary btn-sm"
                                  onClick={() =>
                                    navigate(`/edit-user/${user._id}`)
                                  }
                                >
                                  Modifier
                                </button>
                                <button
                                  className="btn btn-danger btn-sm ml-2"
                                  onClick={() => handleDeleteUser(user._id)}
                                >
                                  Supprimer
                                </button>

                                {/* Générer */}
                                {user.buildStatus === "idle" && (
                                  <button
                                    style={{ width: "100px" }}
                                    className="btn btn-success btn-sm ml-2"
                                    onClick={() => handleGenerateFile(user._id)}
                                    disabled={isBuilding}
                                  >
                                    Générer
                                  </button>
                                )}

                                {/* En cours */}
                                {user.buildStatus === "building" && (
                                  <button
                                    style={{ width: "100px" }}
                                    className="btn btn-warning btn-sm ml-2"
                                    disabled
                                  >
                                    <span
                                      className="spinner-border spinner-border-sm mr-1"
                                      role="status"
                                      aria-hidden="true"
                                    ></span>
                                    En cours...
                                  </button>
                                )}

                                {/* Télécharger */}
                                {user.buildStatus === "done" && (
                                  <button
                                    style={{ width: "100px" }}
                                    className="btn btn-secondary btn-sm ml-2"
                                    onClick={() =>
                                      (window.location.href = `${process.env.REACT_APP_API_URL_DOWNLOAD_FILE}/download/${user._id}`)
                                    }
                                  >
                                    Télécharger
                                  </button>
                                )}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    <div className="d-flex justify-content-between align-items-center mt-3">
                      <button
                        className="btn btn-secondary btn-sm"
                        onClick={goToPrevPage}
                        disabled={currentPage === 1}
                      >
                        Précédent
                      </button>
                      <span>
                        Page {currentPage} sur {totalPages}
                      </span>
                      <button
                        className="btn btn-secondary btn-sm"
                        onClick={goToNextPage}
                        disabled={currentPage === totalPages}
                      >
                        Suivant
                      </button>
                    </div>

                    <div className="text-center mt-3">
                      <button
                        className="btn btn-success btn-sm"
                        onClick={navigateToCreateUser}
                      >
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
