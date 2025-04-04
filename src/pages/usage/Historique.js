import React, { useState, useEffect } from "react";
import Sidebar from "../templates/sidebar";
import Topbar from "../templates/topbar";
import Footer from "../templates/footer";
import useUsers from "../../hooks/utilisateur/useUsers";
import axios from "axios";

function Historique() {
    const { users } = useUsers();
    const [selectedUser, setSelectedUser] = useState("");
    const [selectedDate, setSelectedDate] = useState("");
    const [videos, setVideos] = useState([]);
    const [loading, setLoading] = useState(false);
    const [videoSearched, setVideoSearched] = useState(false);  // Nouveau state pour vérifier si une recherche a été effectuée

    const formatDate = (date) => {
        const [year, month, day] = date.split("-");
        return `${day}-${month}-${year}`;
    };

    useEffect(() => {
        setVideos([]); // Réinitialiser la liste des vidéos à chaque changement d'utilisateur ou de date
        setVideoSearched(false); // Réinitialiser la recherche de vidéos
    }, [selectedUser, selectedDate]);

    const fetchVideos = () => {
        const formattedDate = formatDate(selectedDate);
        setLoading(true);
        axios
            .get(`http://localhost:4000/capture/${selectedUser}/${formattedDate}`)
            .then((response) => {
                const sortedVideos = response.data.sort((a, b) => {
                    const timeA = a.split("_")[2];
                    const timeB = b.split("_")[2];
                    return timeB.localeCompare(timeA);
                });
                setVideos(sortedVideos);
                setVideoSearched(true); // Mettre à jour l'état une fois la recherche terminée
            })
            .catch((error) => {
                console.error("Erreur lors de la récupération des vidéos", error);
                setVideos([]);
                setVideoSearched(true); // Mettre à jour l'état si une erreur se produit
            })
            .finally(() => {
                setLoading(false);
            });
    };

    const handleFilterSubmit = (e) => {
        e.preventDefault();
        fetchVideos();
    };

    return (
        <div className="full_container">
            <div className="inner_container">
                <Sidebar />
                <div id="content">
                    <Topbar />
                    <div className="middle_content">
                        <div className="container-fluid">
                            <div className="row column_title">
                                <div className="col-md-12">
                                    <div className="page_title">
                                        <h2>Historique</h2>
                                    </div>
                                </div>
                            </div>

                            <div className="row justify-content-center">
                                <div className="col-lg-8 col-md-10 col-12">
                                    <div className="white_shd full mb-4 p-4 shadow-lg rounded">
                                        <h3 className="mb-4 text-center">Filtrer les vidéos</h3>
                                        <form onSubmit={handleFilterSubmit}>
                                            <div className="row">
                                                <div className="col-12 col-md-6 mb-3">
                                                    <div className="form-group">
                                                        <label htmlFor="user" className="form-label">Utilisateur</label>
                                                        <select
                                                            id="user"
                                                            className="form-control"
                                                            value={selectedUser}
                                                            onChange={(e) => setSelectedUser(e.target.value)}
                                                            required
                                                        >
                                                            <option value="">Sélectionner un utilisateur</option>
                                                            {users.map((user) => (
                                                                <option key={user._id} value={user._id}>
                                                                    {user.nom}
                                                                </option>
                                                            ))}
                                                        </select>
                                                    </div>
                                                </div>

                                                <div className="col-12 col-md-6 mb-3">
                                                    <div className="form-group">
                                                        <label htmlFor="date" className="form-label">Date</label>
                                                        <input
                                                            type="date"
                                                            id="date"
                                                            className="form-control"
                                                            value={selectedDate}
                                                            onChange={(e) => setSelectedDate(e.target.value)}
                                                            required
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <button type="submit" className="btn btn-primary w-100">Filtrer</button>
                                        </form>
                                    </div>

                                    {/* Affichage des vidéos */}
                                    {loading ? (
                                        <div className="text-center">
                                            <p>Chargement des vidéos...</p>
                                        </div>
                                    ) : (
                                        <div className="row justify-content-center">
                                            {videos.length > 0 ? (
                                                videos.map((video, index) => {
                                                    const formattedDate = formatDate(selectedDate);
                                                    const videoName = video.split("_");
                                                    const videoDate = videoName[1].replace(/-/g, "/");
                                                    const videoTime = videoName[2];

                                                    return (
                                                        <div key={index} className="col-12 col-md-6 col-lg-4 mb-4">
                                                            <div className="card shadow-sm rounded">
                                                                <video controls className="card-img-top w-100 rounded">
                                                                    <source
                                                                        src={`http://localhost:4000/capture/${selectedUser}/${formattedDate}/${video}`}
                                                                        type="video/mp4"
                                                                    />
                                                                    Votre navigateur ne supporte pas la balise vidéo.
                                                                </video>
                                                                <div className="card-body text-center">
                                                                    <p className="card-text">
                                                                        <strong>Date :</strong> {videoDate} <br />
                                                                        <strong>Heure :</strong> {videoTime}
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    );
                                                })
                                            ) : (
                                                videoSearched && (
                                                    <div className="col-12 text-center">
                                                        <p style={{ color: '#ff6f61', fontSize: '18px' }}>
                                                            <i className="fas fa-video-slash" style={{ fontSize: '24px', marginRight: '10px' }}></i>
                                                            Désolé, aucune vidéo trouvée pour cet utilisateur et cette date.
                                                        </p>
                                                    </div>
                                                )
                                            )}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Historique;
