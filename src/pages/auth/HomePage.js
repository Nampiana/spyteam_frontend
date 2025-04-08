// src/pages/HomePage.js

import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';

const HomePage = () => {
  const { isLogged } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    // Si l'utilisateur est connecté
    if (isLogged) {
      const userData = JSON.parse(localStorage.getItem("user"));

      if (userData) {
        if (userData.role === 1) {
          navigate("/users"); 
        } else if (userData.role === 2) {
          navigate("/surveillance");
        } else {
          navigate("/login");
        }
      } else {
        navigate("/login");
      }
    } else {
      navigate("/login");
    }
  }, [isLogged, navigate]);

  return null;
};

export default HomePage;
