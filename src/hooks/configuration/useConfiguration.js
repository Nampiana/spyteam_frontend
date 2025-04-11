// src/hooks/useConfiguration.js
import { useEffect, useState } from "react";
import ConfigurationService from "../../services/configuration/ConfigurationService";

function useConfiguration(userId) {
  const [config, setConfig] = useState(null);

  const fetchConfig = () => {
    if (!userId) return;

    ConfigurationService.getByUserId(userId)
      .then((res) => setConfig(res.data))
      .catch((err) => console.error("Erreur lors de la récupération de la config :", err));
  };

  useEffect(() => {
    fetchConfig();
  }, [userId]);

  const updateConfig = (newConfig, callback = () => {}) => {
    ConfigurationService.upsert({ ...newConfig, userId })
      .then((res) => {
        setConfig(res.data);
        callback();
      })
      .catch((err) => console.error("Erreur mise à jour config :", err));
  };

  return { config, updateConfig, setConfig };
}

export default useConfiguration;
