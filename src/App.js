import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UsersList from "./pages/UsersList"; // Importer la page des utilisateurs
//import Home from "./components/Home"; // Crée un fichier Home.js pour la page d'accueil
import Login from './pages/Login';

function App() {
  return (
    <Router>
        <Routes>
          <Route path="/users" element={<UsersList />} />   {/* Liste des utilisateurs */}
          <Route path="/login" element={<Login />} />
        </Routes>
    </Router>
  );
}

export default App;
