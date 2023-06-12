import React from 'react';
import { NavLink } from 'react-router-dom';
import { Row } from 'reactstrap';
import { Colxx } from 'components/common/CustomBootstrap';

const Footer = () => {
  return (
    <footer className="page-footer">
      <div className="footer-content">
        <div className="container-fluid">
          <Row>
            <Colxx xxs="12" sm="6">
              <p className="mb-0 text-muted">FPT Aptech. Group01-Sem03</p>
            </Colxx>
            <Colxx className="col-sm-6 d-none d-sm-block">
              <ul className="breadcrumb pt-0 pr-0 float-right">
                <li className="breadcrumb-item mb-0">
                  <NavLink className="btn-link" to="#" location={{}}>
                    Thanh
                  </NavLink>
                </li>
                <li className="breadcrumb-item mb-0">
                  <NavLink className="btn-link" to="#" location={{}}>
                    Hung
                  </NavLink>
                </li>
                <li className="breadcrumb-item mb-0">
                  <NavLink className="btn-link" to="#" location={{}}>
                    Sy
                  </NavLink>
                </li>
                <li className="breadcrumb-item mb-0">
                  <NavLink className="btn-link" to="#" location={{}}>
                    Nhan
                  </NavLink>
                </li>
              </ul>
            </Colxx>
          </Row>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
