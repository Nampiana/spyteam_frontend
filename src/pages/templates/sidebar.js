import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Sidebar() {
  const [user, setUser] = useState({ nom: "", prenom: "", role: null });

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user"));
    if (userData) {
      setUser({ 
        nom: userData.nom, 
        prenom: userData.prenom,
        role: userData.role 
      });
    }
  }, []);

  return (
    <nav id="sidebar">
      <div className="sidebar_blog_1">
        <div className="sidebar-header">
          <div className="logo_section">
            <a href="index.html">
              <img
                className="logo_icon img-responsive"
                src="/images/logo/logo_icon.png"
                alt="#"
              />
            </a>
          </div>
        </div>
        <div className="sidebar_user_info">
          <div className="icon_setting"></div>
          <div className="user_profle_side">
            <div className="user_img">
              <img
                className="img-responsive"
                src="/images/layout_img/user_img.jpg"
                alt="#"
              />
            </div>
            <div className="user_info">
              <h6>{user.nom} {user.prenom}</h6>
              <p>
                <span className="online_animation"></span> Actif
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="sidebar_blog_2">
        <h4>General</h4>
        <ul className="list-unstyled components">
          {user.role !== 2 && (
            <li>
              <Link to="/users">
                <i className="fa fa-clock-o orange_color"></i> <span>Utilisateur</span>
              </Link>
            </li>
          )}
          {user.role !== 2 && (
            <li>
              <Link to="/users-desactive">
                <i className="fa fa-clock-o orange_color"></i> <span>Compte désactiver</span>
              </Link>
            </li>
          )}
          <li>
              <Link to="/usage/list">
                <i className="fa fa-table purple_color2"></i> <span>Surveillance</span>
              </Link>
            </li>
        </ul>
      </div>
    </nav>
  );
}

export default Sidebar;