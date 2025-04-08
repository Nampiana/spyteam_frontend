import React, { useEffect, useState, useRef } from "react";
import io from "socket.io-client";
import Sidebar from "../templates/sidebar";
import Topbar from "../templates/topbar";
import Footer from "../templates/footer";
import UsersServices from "../../services/utilisateur/UsersService";

const DEFAULT_IMAGE = "/offline.jpg";

const Surveillance = () => {
  const [clients, setClients] = useState({});
  const [users, setUsers] = useState([]);
  const [fullscreenClientId, setFullscreenClientId] = useState(null);
  const [filter, setFilter] = useState("all"); // all | online | offline
  const usersCache = useRef({});

  useEffect(() => {
    const fetchAllUsers = async () => {
      try {
        const response = await UsersServices.getAll();
        setUsers(response.data.data);
      } catch (error) {
        console.error("Erreur lors de la récupération des utilisateurs", error);
      }
    };

    fetchAllUsers();
  }, []);

  useEffect(() => {
    const socket = io("http://192.168.1.177:4000");

    socket.on("videoStream", async (data) => {
      try {
        const blob = new Blob([new Uint8Array(data.image)], { type: "image/jpeg" });
        const imageUrl = URL.createObjectURL(blob);

        setClients((prevClients) => ({
          ...prevClients,
          [data.clientId]: imageUrl,
        }));

        if (!usersCache.current[data.clientId]) {
          const response = await UsersServices.getOne(data.clientId);
          const userData = response.data.data;
          usersCache.current[data.clientId] = userData;
        }
      } catch (e) {
        console.error("Erreur lors du traitement du flux vidéo", e);
      }
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  // Filtrage des utilisateurs selon l'état sélectionné
  const filteredUsers = users.filter((user) => {
    const isOnline = !!clients[user._id];
    if (filter === "online") return isOnline;
    if (filter === "offline") return !isOnline;
    return true;
  });

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
                      <div className="heading1 margin_0 d-flex justify-content-between align-items-center">
                        <h2>Flux Vidéo en Temps Réel</h2>

                        {/* Filtre */}
                        <select
                          value={filter}
                          onChange={(e) => setFilter(e.target.value)}
                          style={{ padding: "5px 10px", borderRadius: "5px", fontSize: "14px" }}
                        >
                          <option value="all">Tous</option>
                          <option value="online">En ligne</option>
                          <option value="offline">Hors ligne</option>
                        </select>
                      </div>
                    </div>

                    <div className="full gallery_section_inner padding_infor_info">
                      <div className="row">
                        {filteredUsers.map((user) => {
                          const imageUrl = clients[user._id] || DEFAULT_IMAGE;
                          const isOnline = !!clients[user._id];

                          return (
                            <div key={user._id} className="col-sm-4 col-md-3 margin_bottom_30">
                              <div className="column" style={{ height: "300px" }}>
                                <img
                                  src={imageUrl}
                                  alt={`Client ${user._id}`}
                                  style={{
                                    width: "100%",
                                    height: "100%",
                                    objectFit: "contain",
                                    border: "solid black 2px",
                                    cursor: "pointer",
                                  }}
                                  onClick={() => setFullscreenClientId(user._id)}
                                />
                              </div>

                              <div className="heading_section" style={{ marginTop: "10px" }}>
                                <h4 style={{ marginBottom: "5px" }}>
                                  {`${user.nom} ${user.prenom}`}
                                </h4>

                                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                                  <span
                                    style={{
                                      width: "10px",
                                      height: "10px",
                                      borderRadius: "50%",
                                      backgroundColor: isOnline ? "green" : "red",
                                      display: "inline-block",
                                    }}
                                  ></span>
                                  <span
                                    style={{
                                      fontSize: "14px",
                                      color: isOnline ? "green" : "red",
                                    }}
                                  >
                                    {isOnline ? "En ligne" : "Hors ligne"}
                                  </span>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>

                      {filteredUsers.length === 0 && (
                        <div style={{ textAlign: "center", marginTop: "20px", color: "gray" }}>
                          Aucun utilisateur {filter === "online" ? "en ligne" : "hors ligne"}.
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {fullscreenClientId && (
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
            src={clients[fullscreenClientId] || DEFAULT_IMAGE}
            alt="Fullscreen"
            style={{ maxWidth: "90%", maxHeight: "90%", borderRadius: "10px" }}
          />
        </div>
      )}
    </div>
  );
};

export default Surveillance;
