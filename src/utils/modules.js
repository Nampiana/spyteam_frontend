export const ApiUrl =  "http://localhost:4000/api/v1/";

/*export const header = (type = "json") => {
    const token = localStorage.getItem("access_token");
    
    let headers = {
        Authorization: `Bearer ${token}`,
    };

    if (type === "json") {
        headers["Content-Type"] = "application/json";
    } else if (type === "image") {
        headers["Content-Type"] = "multipart/form-data";
    }

    return { headers };
};*/


// Ajoute ton token ici pour tester
/*const TEST_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3N2U2OTg0ZGViYzkzZTk0MmI2YmM4ZCIsImlhdCI6MTc0Mjk2NTk5NywiZXhwIjoxNzc0NTAxOTk3fQ.kShrTyTpPs-kdAeOLDHhzmDLEsGfjXJRcdX3D50f3E4";  // Remplace "TON_TOKEN_ICI" par un vrai token

export const header = (type = "json") => {
    let headers = {
        Authorization: `Bearer ${TEST_TOKEN}`, // Utilisation d'un token fixe
    };

    if (type === "json") {
        headers["Content-Type"] = "application/json";
    } else if (type === "image") {
        headers["Content-Type"] = "multipart/form-data";
    }

    return { headers };
};*/

/*export const ApiUrl = "http://192.168.1.161:4000/api/v1/";*/

// Fonction pour générer des headers selon le type de contenu
export const header = (type = "json") => {
  const token = localStorage.getItem("access_token");

  const headers = {
    json: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }), // Ajoute le token si dispo
    },
    image: {
      "Content-Type": "multipart/form-data",
      ...(token && { Authorization: `Bearer ${token}` }),
    },
  };

  return {
    headers: headers[type] || headers.json,
  };
};

