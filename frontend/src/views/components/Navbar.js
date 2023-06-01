import React, { useEffect, useState } from 'react';
import Headroom from 'react-headroom';
import { Link } from 'react-router-dom/cjs/react-router-dom';
import { getCurrentUser } from 'helpers/Utils';

function Navbar(props) {
  const { scrollTo, setShowMobileMenu, showMobileMenu } = props;

  // set button login/logout
  const [userName, setUserName] = useState(null);
  useEffect(() => {
    if (getCurrentUser() != null) {
      setUserName(getCurrentUser().userName);
    }
  }, [userName]);
  return (
    <div>
      <Headroom className="landing-page-nav">
        <nav>
          <div className="container d-flex align-items-center justify-content-between">
            <a
              className="navbar-logo pull-left c-pointer"
              href="#scroll"
              onClick={(event) => scrollTo(event, 'home')}
            >
              <span className="white" />
              <span className="dark" />
            </a>
            <div className="navbar-nav d-none d-lg-flex flex-row">
              <li className="nav-item">
                <a
                  className="c-pointer"
                  href="#scroll"
                  onClick={(event) => scrollTo(event, 'features')}
                >
                  AUTHOR
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="c-pointer"
                  href="#scroll"
                  onClick={(event) => scrollTo(event, 'layouts')}
                >
                  RECIPE
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="c-pointer"
                  href="#scroll"
                  onClick={(event) => scrollTo(event, 'components')}
                >
                  CONTEST
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="c-pointer"
                  href="#scroll"
                  onClick={(event) => scrollTo(event, 'apps')}
                >
                  WINNER
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="c-pointer"
                  href="#scroll"
                  onClick={(event) => scrollTo(event, 'themes')}
                >
                  SUBSCRIPTION
                </a>
              </li>
              { userName? (
                <>
                  <Link to="/login" className="nav-item pl-4">
                    <a
                      className="btn btn-outline-semi-light btn-sm pr-4 pl-4"
                      target="_blank"
                      rel="noopener noreferrer"
                      href="#foo"
                    >
                      Logout
                    </a>
                  </Link>
                  <p className="nav-item pr-4 pl-4 pt-3">Hi, {userName}</p>
                </>
              ):(
                <Link to="/login" className="nav-item pl-4">
                  <a
                    className="btn btn-outline-semi-light btn-sm pr-4 pl-4"
                    target="_blank"
                    rel="noopener noreferrer"
                    href="#foo"
                  >
                    Login
                  </a>
                </Link>
              )}
            </div>
            {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */}
            <span
              className="mobile-menu-button"
              onClick={(event) => {
                setShowMobileMenu(!showMobileMenu);
                event.stopPropagation();
              }}
            >
              <i className="simple-icon-menu" />
            </span>
          </div>
        </nav>
      </Headroom>
    </div>
  );
}

export default Navbar;
