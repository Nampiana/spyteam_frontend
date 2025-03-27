import React, { createContext, useState, useEffect } from 'react';
import AuthServices from '../services/auth/AuthServices';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLogged, setIsLogged] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [alertMessage, setAlertMessage] = useState(null);

  const navigate = useNavigate();

  const login = async (credentials) => {
    setIsLoading(true);
    try {
      const res = await AuthServices.login(credentials);
      console.log(res);
  
      setUser(res.data.user);
      setIsLogged(true);
      localStorage.setItem('access_token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.data.user)); 
      console.log("user", res.data.data.user);
      
      // Redirection en fonction du rôle
      const userRole = res.data.data.user.role;
      if (userRole === 1) {
        navigate('/users');
      } else if (userRole === 2) {
        navigate('/usage/list'); 
      } else {
        navigate('/'); 
      }
      
    } catch (err) {
      console.error('Erreur de connexion :', err.response?.data?.message);
      setAlertMessage({ type: "danger", text: err.response?.data?.message || "Erreur de connexion !" });
      toast.error(err.response?.data?.message || "Erreur inconnue", {
        position: "top-right",
        theme: "colored",
        className: "toast-message",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    AuthServices.logout()
      .then(() => {
        localStorage.removeItem('access_token');
        localStorage.removeItem('user');
  
        setIsLogged(false);
        setUser(null);
        
        navigate('/login');
      })
      .catch((err) => {
        console.error('Erreur de déconnexion :', err);
      });
  };

  useEffect(() => {
    if (alertMessage) {
      const timer = setTimeout(() => setAlertMessage(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [alertMessage]);

  useEffect(() => {
    const token = localStorage.getItem('access_token');    
    if (token) {
      setIsLogged(true);
      AuthServices.checkToken(token)
        .then((res) => {
          setUser(res.data.user);
          // Redirection automatique si déjà connecté
          const userRole = res.data.user.role;
          if (userRole === 1) {
            navigate('/users');
          } else if (userRole === 2) {
            navigate('/usage/list');
          }
        })
        .catch(() => {
          setIsLogged(false);
          setUser(null);
        });
    } else {
      console.log("pas de token");
      navigate('/login');
    }
  }, [navigate]);

  return (
    <AuthContext.Provider
      value={{
        user,
        isLogged,
        isLoading,
        login,
        logout,
        setIsLoading,
        alertMessage,
        setAlertMessage,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};