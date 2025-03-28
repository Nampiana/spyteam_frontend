import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { Link } from "react-router-dom";
import '../../style/topbar.css';

function Topbar() {
  const { logout } = useContext(AuthContext);
  const [user, setUser] = useState({ nom: "", prenom: "" });
  const image =  require('../../assets/images/layout_img/user_img.jpg');
  const logo =  require('../../assets/images/logo/logo.png');

  useEffect(() => {
   const userData = JSON.parse(localStorage.getItem("user"));
   if (userData) {
     setUser({ nom: userData.nom, prenom: userData.prenom });
   }
 }, []);

  return (
    <div className="topbar">
      <nav className="navbar navbar-expand-lg navbar-light">
        <div className="full">
          <button type="button" id="sidebarCollapse" className="sidebar_toggle">
            <i className="fa fa-bars"></i>
          </button>
          <div className="logo_section">
            <a href="/" className="logo_link">
               <img className="img-responsive" src={logo} alt="#" />
               <span className="logo_text">SpyTeam</span>
            </a>
            </div>
          <div className="right_topbar">
            <div className="icon_info">
              <ul className="user_profile_dd">
                <li>
                  <a className="dropdown-toggle" data-toggle="dropdown">
                    <img className="img-responsive rounded-circle" src={image} alt="#" />
                    <span className="name_user">{user.nom} {user.prenom}</span>
                  </a>
                  <div className="dropdown-menu">
                    <a className="dropdown-item" href="/profile">Profile</a>
                    <a className="dropdown-item" href="/Setting">Paramètre</a>
                    <a className="dropdown-item" onClick={logout} style={{ cursor: "pointer" }}>
                      <span>Déconnexion</span> <i className="fa fa-sign-out"></i>
                    </a>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Topbar;
