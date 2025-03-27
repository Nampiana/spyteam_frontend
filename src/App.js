import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";  
import UsersList from "./pages/utilisateur/UsersList";
import UsersDesactive from "./pages/utilisateur/UsersDesactive";
import CreateUser from "./pages/utilisateur/CreateUser";
import UserEdit from "./pages/utilisateur/UserEdit";
import UsageListPage from "./pages/usage/UsageListePage";
import HomePage from "./pages/auth/HomePage";
import Login from './pages/auth/Login';
import Profile from './pages/utilisateur/Profile';
import Setting from './pages/utilisateur/Setting';

function App() {
  return (
    <Router>
      <AuthProvider>  
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/Profile" element={<Profile />} />
          <Route path="/Setting" element={<Setting />} />


          {/* routes admin */}
          <Route path="/users" element={<UsersList />} />
          <Route path="/users-desactive" element={<UsersDesactive />} />
          <Route path="/create-user" element={<CreateUser />} />
          <Route path="/edit-user/:id" element={<UserEdit />} />

          {/* routes supervisserur */}
          <Route path="/usage/list" element={<UsageListPage />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
