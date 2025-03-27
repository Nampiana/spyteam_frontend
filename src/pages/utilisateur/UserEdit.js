import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import UsersServices from "../../services/utilisateur/UsersService";
import Sidebar from "../templates/sidebar";
import Topbar from "../templates/topbar";

function UserEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState({ type: "", text: "" }); // État pour le message de validation

  useEffect(() => {
    UsersServices.getOne(id)
      .then((res) => {
        if (res.data) {
          console.log("Utilisateur récupéré avec succès :", res.data.data);
          setUser(res.data.data);
        }
      })
      .catch((err) => {
        console.error("Erreur lors de la récupération de l'utilisateur :", err);
        setMessage({ type: "error", text: "Erreur lors du chargement des données." });
      });
  }, [id]);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    UsersServices.update(id, user)
      .then(() => {
        setMessage({ type: "success", text: "Utilisateur modifié avec succès !" });
        setTimeout(() => navigate("/users"), 2000); // Redirection après 2 secondes
      })
      .catch((err) => {
        console.error("Erreur lors de la mise à jour :", err);
        setMessage({ type: "error", text: "Erreur lors de la modification de l'utilisateur." });
      });
  };

  if (!user) {
    return <p>Chargement des données...</p>;
  }

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
                    <h2>Modifier Utilisateur</h2>
                  </div>
                </div>
              </div>
              <div className="col-md-6 offset-md-3">
                <div className="white_shd full margin_bottom_30">
                  <div className="form_section padding_infor_info">
                    {message.text && (
                      <div className={`alert ${message.type === "success" ? "alert-success" : "alert-danger"}`}>
                        {message.text}
                      </div>
                    )}
                    <form onSubmit={handleSubmit}>
                      <div className="form-group">
                        <label>Nom</label>
                        <input type="text" name="nom" className="form-control" value={user.nom || ""} onChange={handleChange} required />
                      </div>
                      <div className="form-group">
                        <label>Prénom</label>
                        <input type="text" name="prenom" className="form-control" value={user.prenom || ""} onChange={handleChange} required />
                      </div>
                      <div className="form-group">
                        <label>Email</label>
                        <input type="email" name="email" className="form-control" value={user.email || ""} onChange={handleChange} required />
                      </div>
                      <div className="form-group">
                        <label>Téléphone</label>
                        <input type="number" name="tel" className="form-control" value={user.tel || ""} onChange={handleChange} required />
                      </div>
                      <div className="form-group">
                        <label>Adresse</label>
                        <input type="text" name="adresse" className="form-control" value={user.adresse || ""} onChange={handleChange} required />
                      </div>
                      <div className="form-group">
                        <label>Rôle</label>
                        <select name="role" className="form-control" value={user.role || 3} onChange={handleChange}>
                          <option value={1}>Admin</option>
                          <option value={2}>Superviseur</option>
                          <option value={3}>Client</option>
                        </select>
                      </div>
                      <button type="submit" className="btn btn-primary">Mettre à jour</button>
                      <button type="button" className="btn btn-secondary ml-2" onClick={() => navigate("/users")}>Annuler</button>
                    </form>
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

export default UserEdit;
