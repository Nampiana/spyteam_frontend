import React from "react";
import Sidebar from "../templates/sidebar";
import Topbar from "../templates/topbar";
import Footer from "../templates/footer";
import image from '../../assets/g3.jpg';

function UsageListPage() {
  const video = require('../../assets/12.mp4');
  const image =  require('../../assets/12.mp4');

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
              {/* row */}
              <div className="row column4 graph">
                {/* Gallery section */}
                <div className="col-md-12">
                  <div className="white_shd full margin_bottom_30">
                    <div className="full graph_head">
                      <div className="heading1 margin_0">
                        <h2>Media Gallery Design Elements</h2>
                      </div>
                    </div>
                    <div className="full gallery_section_inner padding_infor_info">
                      <div className="row">
                        {/* Repeat this structure for the other images */}
                        <div className="col-sm-4 col-md-3 margin_bottom_30">
                          <div className="column" style={{ "height": "300px" }}>
                            <a data-fancybox="gallery" href={image}>
                              <video
                                className="video-responsive"
                                controls
                                style={{ width: "100%", height: "300px" }} // Set the video size to fit in the grid
                              >
                                <source src={video} type="video/mp4" />
                                Votre navigateur ne supporte pas la lecture de vidéos.
                              </video>
                            </a>
                          </div>
                          <div className="heading_section">
                            <h4>Aroniaina</h4>
                          </div>
                        </div>

                        <div className="col-sm-4 col-md-3 margin_bottom_30">
                          <div className="column" style={{ "height": "300px" }}>
                            <a data-fancybox="gallery" href={image}>
                              <video
                                className="video-responsive"
                                controls
                                style={{ width: "100%", height: "300px" }} // Same size for the second video
                              >
                                <source src={video} type="video/mp4" />
                                Votre navigateur ne supporte pas la lecture de vidéos.
                              </video>
                            </a>
                          </div>
                          <div className="heading_section">
                            <h4>Nampiana</h4>
                          </div>
                        </div>
                        <div className="col-sm-4 col-md-3 margin_bottom_30">
                          <div className="column" style={{ "height": "300px" }}>
                            <a data-fancybox="gallery" href={image}>
                              <video
                                className="video-responsive"
                                controls
                                style={{ width: "100%", height: "300px" }} // Same size for the second video
                              >
                                <source src={video} type="video/mp4" />
                                Votre navigateur ne supporte pas la lecture de vidéos.
                              </video>
                            </a>
                          </div>
                          <div className="heading_section">
                            <h4>Rino</h4>
                          </div>
                        </div>
                        <div className="col-sm-4 col-md-3 margin_bottom_30">
                          <div className="column" style={{ "height": "300px" }}>
                            <a data-fancybox="gallery" href={image}>
                              <video
                                className="video-responsive"
                                controls
                                style={{ width: "100%", height: "300px" }} // Same size for the second video
                              >
                                <source src={video} type="video/mp4" />
                                Votre navigateur ne supporte pas la lecture de vidéos.
                              </video>
                            </a>
                          </div>
                          <div className="heading_section">
                            <h4>Gervais</h4>
                          </div>
                        </div>
                        {/* Add more images/videos as needed */}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* end dashboard inner */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default UsageListPage;
