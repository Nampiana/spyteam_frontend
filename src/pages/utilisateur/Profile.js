import React, {useState, useEffect } from "react";
import Sidebar from "../templates/sidebar";
import Topbar from "../templates/topbar";
import Footer from "../templates/footer";


function Profile() {

      const [user, setUser] = useState({ nom: "", prenom: "", role: "", email: "", tel: "", adresse: "" });
    
      useEffect(() => {
       const userData = JSON.parse(localStorage.getItem("user"));
       if (userData) {
         setUser({ nom: userData.nom, prenom: userData.prenom, role: userData.role, email: userData.email, tel: userData.tel, adresse: userData.adresse });
       }
     }, []);

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
                    <h2>Profile</h2>
                  </div>
                </div>
              </div>
              <div className="row column1">
                <div className="col-md-2"></div>
                <div className="col-md-8">
                  <div className="white_shd full margin_bottom_30">
                    <div className="full graph_head">
                      <div className="heading1 margin_0">
                        <h2>User profile</h2>
                      </div>
                    </div>
                    <div className="full price_table padding_infor_info" style={{ padding: '30px' }}>
                        <div className="row">
                        {/* User profile section */}
                        <div className="col-lg-12">
                            <div className="full dis_flex center_text">
                            <div className="profile_img" style={{ marginRight: '40px' }}>
                                <img
                                width="180"
                                className="rounded-circle"
                                src="images/layout_img/user_img.jpg"
                                alt="#"
                                style={{ border: '5px solid #e0e0e0', boxShadow: '0 5px 15px rgba(0,0,0,0.1)' }}
                                />
                            </div>
                            <div className="profile_contant" style={{ textAlign: 'left', flex: 1 }}>
                                <div className="contact_inner">
                                <h3 style={{ color: '#333', fontSize: '28px', marginBottom: '15px', fontWeight: '700' }}>
                                    {user.nom} {user.prenom}
                                </h3>
                                <p style={{ 
                                    background: user.role === 2 ? 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)' : 
                                                user.role === 1 ? 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)' : 
                                                                'linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 100%)',
                                    color: 'white',
                                    padding: '5px 15px',
                                    borderRadius: '20px',
                                    display: 'inline-block',
                                    fontWeight: '500',
                                    marginBottom: '20px'
                                }}>
                                    <strong>Role: </strong>
                                    {user.role === 2 ? 'Superviseur' : user.role === 1 ? 'Admin' : 'Utilisateur'}
                                </p>

                                <ul className="list-unstyled" style={{ marginTop: '20px' }}>
                                    <li style={{ marginBottom: '10px', color: '#555' }}>
                                    <i className="fa fa-envelope-o" style={{ color: '#6a11cb', marginRight: '10px', width: '20px' }}></i> 
                                    <span style={{ fontWeight: '500' }}>{user.email}</span>
                                    </li>
                                    <li style={{ marginBottom: '10px', color: '#555' }}>
                                    <i className="fa fa-phone" style={{ color: '#2575fc', marginRight: '10px', width: '20px' }}></i> 
                                    <span style={{ fontWeight: '500' }}>{user.tel}</span>
                                    </li>
                                    <li style={{ marginBottom: '10px', color: '#555' }}>
                                    <i className="fa fa-home" style={{ color: '#00b09b', marginRight: '10px', width: '20px' }}></i> 
                                    <span style={{ fontWeight: '500' }}>{user.adresse}</span>
                                    </li>
                                </ul>
                                </div>
                            </div>
                            </div>
                        </div>
                        </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-2"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
