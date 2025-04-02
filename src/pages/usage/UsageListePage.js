import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import Sidebar from "../templates/sidebar";
import Topbar from "../templates/topbar";
import Footer from "../templates/footer";
import UsersServices from "../../services/utilisateur/UsersService"; // Import du service utilisateur

const UsageListPage = () => {
  const [clients, setClients] = useState({});
  const [users, setUsers] = useState({}); // Stocker les infos des utilisateurs
  const [fullscreenClientId, setFullscreenClientId] = useState(null);

  useEffect(() => {
    const socket = io("http://localhost:5000");

    socket.on("videoStream", async (data) => {
      try {
        const blob = new Blob([new Uint8Array(data.image)], { type: "image/jpeg" });
        const imageUrl = URL.createObjectURL(blob);

        setClients((prevClients) => ({
          ...prevClients,
          [data.clientId]: imageUrl,
        }));

        // Récupérer les détails de l'utilisateur
        fetchUserDetails(data.clientId);
      } catch (e) {
        console.error("Erreur lors du traitement du flux vidéo", e);
      }
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const fetchUserDetails = async (clientId) => {
    if (!users[clientId]) { // Éviter les requêtes inutiles si on a déjà les données
      try {
        const response = await UsersServices.getOne(clientId);
        console.log("Utilisateur récupéré:", response.data.data);
        setUsers((prevUsers) => ({
          ...prevUsers,
          [clientId]: response.data.data, // Stocker l'utilisateur récupéré
        }));
      } catch (error) {
        console.error("Erreur lors de la récupération de l'utilisateur", error);
      }
    }
  };

  return (
    <div className="full_container">
      <div className="inner_container">
        <Sidebar />
        <div id="content">
          <Topbar />
          <div className="midde_cont">
            <div className="container-fluid">
              <div className="row column_title">
                <div className="col-md-12">
                  <div className="page_title">
                    <h2>Media Gallery</h2>
                  </div>
                </div>
              </div>
              <div className="row column4 graph">
                <div className="col-md-12">
                  <div className="white_shd full margin_bottom_30">
                    <div className="full graph_head">
                      <div className="heading1 margin_0">
                        <h2>Flux Vidéo en Temps Réel</h2>
                      </div>
                    </div>
                    <div className="full gallery_section_inner padding_infor_info">
                      <div className="row">
                        {Object.entries(clients).map(([clientId, imageUrl]) => (
                          <div key={clientId} className="col-sm-4 col-md-3 margin_bottom_30">
                            <div className="column" style={{ height: "300px" }}>
                              <img
                                src={imageUrl}
                                alt={`Client ${clientId}`}
                                style={{ width: "100%", height: "300px", objectFit: "cover", border: "solid black 2px", cursor: "pointer" }}
                                onClick={() => setFullscreenClientId(clientId)}
                              />
                            </div>
                            {/* Affichage du nom et prénom sous l'image */}
                            <div className="heading_section">
                              <h4>{users[clientId] ? `${users[clientId].nom} ${users[clientId].prenom}` : "Chargement..."}</h4>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mode plein écran */}
      {fullscreenClientId && clients[fullscreenClientId] && (
        <div
          className="fullscreen-overlay"
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.8)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
          }}
          onClick={() => setFullscreenClientId(null)}
        >
          <img
            src={clients[fullscreenClientId]}
            alt="Fullscreen"
            style={{ maxWidth: "90%", maxHeight: "90%", borderRadius: "10px" }}
          />
        </div>
      )}
    </div>
  );
};

export default UsageListPage;
