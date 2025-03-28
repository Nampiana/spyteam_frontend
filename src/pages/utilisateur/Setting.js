// src/pages/Setting.js
import React, { useState } from "react";
import Sidebar from "../templates/sidebar";
import Topbar from "../templates/topbar";
import useAuth from "../../hooks/auth/useAuth";

function Setting() {
  const [passwordCurrent, setPasswordCurrent] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const { message, error, updatePassword } = useAuth();

  const handlePasswordChange = async (e) => {
    e.preventDefault();

    if (!passwordCurrent || !password || !passwordConfirm) {
      alert("Tous les champs sont obligatoires.");
      return;
    }

    if (password !== passwordConfirm) {
      alert("Les nouveaux mots de passe ne correspondent pas.");
      return;
    }

    const userData = localStorage.getItem("user");
    if (!userData) {
      alert("Utilisateur non authentifié.");
      return;
    }

    const parsedUserData = JSON.parse(userData);
    if (!parsedUserData?._id) {
      alert("ID utilisateur introuvable.");
      return;
    }
    await updatePassword(parsedUserData._id, {
      passwordCurrent,
      password,
      passwordConfirm,
    });

    setPasswordCurrent("");
    setPassword("");
    setPasswordConfirm("");
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
                    <h2>Modifier le mot de passe</h2>
                  </div>
                </div>
              </div>
              <div className="col-md-12">
                <div className="white_shd full margin_bottom_30">
                  <div className="full graph_head">
                    <div className="heading1 margin_0">
                      <h2>Paramètres</h2>
                    </div>
                  </div>
                  <div className="table_section padding_infor_info">
                    <form onSubmit={handlePasswordChange}>
                      <div className="form-group">
                        <label>Ancien mot de passe</label>
                        <input
                          type="password"
                          className="form-control"
                          value={passwordCurrent}
                          onChange={(e) => setPasswordCurrent(e.target.value)}
                          required
                        />
                      </div>
                      <div className="form-group">
                        <label>Nouveau mot de passe</label>
                        <input
                          type="password"
                          className="form-control"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          required
                        />
                      </div>
                      <div className="form-group">
                        <label>Confirmer le nouveau mot de passe</label>
                        <input
                          type="password"
                          className="form-control"
                          value={passwordConfirm}
                          onChange={(e) => setPasswordConfirm(e.target.value)}
                          required
                        />
                      </div>
                      {error && <div className="alert alert-danger">{error}</div>}
                      {message && <div className="alert alert-success">{message}</div>}
                      <button type="submit" className="btn btn-primary">
                        Changer le mot de passe
                      </button>
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

export default Setting;
