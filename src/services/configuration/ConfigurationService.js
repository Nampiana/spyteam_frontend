// src/services/utilisateur/ConfigurationService.js
import axios from "axios";
import { ApiUrl, header } from "../../utils/modules";

class ConfigurationService {
  getByUserId(userId) {
    return axios.get(`${ApiUrl}configuration/config/${userId}`, { headers: header("json").headers });
  }

  upsert(data) {
    return axios.post(`${ApiUrl}configuration/config`, data, { headers: header("json").headers });
  }
}

export default new ConfigurationService();
