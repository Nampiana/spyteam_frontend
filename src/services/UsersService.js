/*import axios from "axios";
import { ApiUrl } from "../utils/modules";
import { header } from "../utils/modules";

class UsersServices {
  getAll() {
    return axios.get(ApiUrl + "utilisateur");
  }
  
  getOne(id) {
    return axios.get(ApiUrl + `utilisateur/${id}`);
  }

  create(data) {
    return axios.post(ApiUrl + "utilisateur", data, header("json"));
  }

  update(id, data) {
    return axios.patch(ApiUrl + `utilisateur/${id}`, data, header("json"));
  }

  delete(id) {
    return axios.delete(ApiUrl + `utilisateur/${id}`);
  }
}

export default new UsersServices();*/

import axios from "axios";
import { ApiUrl, header } from "../utils/modules";

class UsersServices {
  getAll() {
    return axios.get(`${ApiUrl}utilisateur`, { headers: header("json").headers });
  }
  
  getOne(id) {
    return axios.get(`${ApiUrl}utilisateur/${id}`, { headers: header("json").headers });
  }

  create(data) {
    return axios.post(`${ApiUrl}utilisateur`, data, { headers: header("json").headers });
  }

  update(id, data) {
    return axios.patch(`${ApiUrl}utilisateur/${id}`, data, { headers: header("json").headers });
  }

  delete(id) {
    return axios.delete(`${ApiUrl}utilisateur/${id}`, { headers: header("json").headers });
  }
}

export default new UsersServices();

