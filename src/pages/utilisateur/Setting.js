import React from "react";
import Sidebar from "../templates/sidebar";
import Topbar from "../templates/topbar";
import Footer from "../templates/footer";

function UsageListPage() {

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
                        <h2>COUCOU Superviseur</h2>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="white_shd full margin_bottom_30">
                      <div className="full graph_head">
                        <div className="heading1 margin_0">
                          <h2>Coucou Superviseur</h2>
                        </div>
                      </div>
                      <div className="table_section padding_infor_info">
                      <h2 className="mb-4 text-center">COUCOU setting</h2>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
  );
}

export default UsageListPage;
