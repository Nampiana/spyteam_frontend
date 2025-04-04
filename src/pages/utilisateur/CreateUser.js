import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../templates/sidebar";
import Topbar from "../templates/topbar";
import Footer from "../templates/footer";
import useUsers from "../../hooks/utilisateur/useUsers"; 

function CreateUser() {
  const navigate = useNavigate();
  const { createUser } = useUsers(); // Récupération de la fonction createUser

  const [formData, setFormData] = useState({
    nom: "",
    prenom: "",
    email: "",
    photo: "/default.png",
    tel: "",
    adresse: "",
    role: "",
    password: "",
    passwordConfirm: ""
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.password !== formData.passwordConfirm) {
      setError("Les mots de passe ne correspondent pas.");
      return;
    }

    setError("");

    // Appel de la fonction createUser
    createUser(formData, () => {
      console.log("Utilisateur créé avec succès !");
      navigate("/users"); // Redirection après création
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
              <div className="col-md-12">
                <div className="white_shd full margin_bottom_30">
                  <div className="full graph_head">
                    <div className="heading1 margin_0">
                      <h2>Créer un utilisateur</h2>
                    </div>
                  </div>
                  <div className="form_section padding_infor_info">
                    {error && <div className="alert alert-danger">{error}</div>}
                    <form onSubmit={handleSubmit}>
                      <div className="form-group">
                        <label>Nom</label>
                        <input type="text" name="nom"  className="form-control" onChange={handleChange} required />
                      </div>
                      <div className="form-group">
                        <label>Prénom</label>
                        <input type="text" name="prenom"  className="form-control" onChange={handleChange} required />
                      </div>
                      <div className="form-group">
                        <label>Email</label>
                        <input type="email" name="email"  className="form-control" onChange={handleChange} required />
                      </div>
                      <div className="form-group">
                        <label>Téléphone</label>
                        <input type="tel" name="tel"  className="form-control" onChange={handleChange} required />
                      </div>
                      <div className="form-group">
                        <label>Adresse</label>
                        <input type="text" name="adresse"  className="form-control" onChange={handleChange} required />
                      </div>
                      <div className="form-group">
                        <label>Rôle</label>
                        <select name="role"  className="form-control" onChange={handleChange} required>
                          <option value="">Sélectionner un rôle</option>
                          <option value="1">Admin</option>
                          <option value="2">Superviseur</option>
                          <option value="3">Client</option>
                        </select>
                      </div>
                      <div className="form-group">
                        <label>Mot de passe</label>
                        <input type="password" name="password"  className="form-control" onChange={handleChange} required />
                      </div>
                      <div className="form-group">
                        <label>Confirmer le mot de passe</label>
                        <input type="password" name="passwordConfirm"  className="form-control" onChange={handleChange} required />
                      </div>
                      <button type="submit" className="btn btn-success">Créer</button>
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

export default CreateUser;
