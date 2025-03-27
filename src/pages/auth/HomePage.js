// src/pages/HomePage.js

import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';

const HomePage = () => {
  const { isLogged } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (isLogged) {
      navigate('/usage/list');
    } else {
     navigate('/login');
    }
  }, [isLogged, navigate]);

  return null;
};

export default HomePage;