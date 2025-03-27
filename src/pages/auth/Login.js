import React, { useState, useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";

const Login = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [errorMessage, setErrorMessage] = useState("");
  const { login, isLoading, alertMessage } = useContext(AuthContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMessage(""); // Réinitialiser le message d'erreur avant la tentative de connexion

    login({ email, password }).catch((err) => {
      setErrorMessage(err.response?.data?.message || "Email ou mot de passe incorrect !");
    });
  };

  return (
    <div className="full_container" style={{ background: "#ddd" }}>
      <div className="container">
        <div className="center verticle_center full_height">
          <div className="login_section">
            <div className="logo_login">
              <div className="center">
                <img width="210" src="images/logo/logo.png" alt="Logo" />
              </div>
            </div>
            <div className="login_form">
              <form onSubmit={handleSubmit}>
                <fieldset>
                  <div className="field">
                    <label className="label_field">Email Address</label>
                    <input
                      type="email"
                      name="email"
                      placeholder="E-mail"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div className="field">
                    <label className="label_field">Password</label>
                    <input
                      type="password"
                      name="password"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                  
                  {/* Afficher le message d'erreur ici avec un style approprié */}
                  {(errorMessage || alertMessage) && (
                    <div className="field" style={{ marginBottom: "15px" }}>
                      <div className={`alert ${errorMessage ? "alert-danger" : `alert-${alertMessage?.type}`}`} style={{ margin: 0 }}>
                        {errorMessage || alertMessage?.text}
                      </div>
                    </div>
                  )}
                  
                  <div className="field">
                    <label className="label_field hidden">hidden label</label>
                    <label className="form-check-label">
                      <input type="checkbox" className="form-check-input" /> Remember Me
                    </label>
                    <a className="forgot" href="#">Forgotten Password?</a>
                  </div>
                  <div className="field margin_0">
                    <label className="label_field hidden">hidden label</label>
                    <button className="main_bt" type="submit" disabled={isLoading}>
                      {isLoading ? <span className="spinner-border spinner-border-sm" role="status"></span> : "Sign In"}
                    </button>
                  </div>
                </fieldset>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;