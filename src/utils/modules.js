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
const TEST_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3N2U2OTg0ZGViYzkzZTk0MmI2YmM4ZCIsImlhdCI6MTc0MjkwMjAyNSwiZXhwIjoxNzc0NDM4MDI1fQ.27WoITG55gnqpsRw5SI27mwTR_4w0kwjglo53Q-xvw0";  // Remplace "TON_TOKEN_ICI" par un vrai token

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
};

