// src/hooks/useAuth.js
import { useState } from "react";
import AuthServices from "../../services/auth/AuthServices";

const useAuth = () => {
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const updatePassword = async (userId, passwordData) => {
    setMessage(""); // Réinitialiser le message de succès
    setError(""); // Réinitialiser les erreurs

    try {
      // Appel au service pour mettre à jour le mot de passe
      await AuthServices.updatePassword(userId, passwordData);
      setMessage("Mot de passe mis à jour avec succès !");
    } catch (err) {
      const errorMessage =
        typeof err.response?.data?.error === "string"
          ? err.response.data.error
          : "Erreur lors de la mise à jour.";
      setError(errorMessage);
    }
  };

  return { message, error, updatePassword };
};

export default useAuth;
