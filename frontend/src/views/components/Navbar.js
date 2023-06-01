import React from 'react';
import Headroom from 'react-headroom';
import { Link } from 'react-router-dom/cjs/react-router-dom';

function Navbar(props) {
  const { scrollTo, setShowMobileMenu, showMobileMenu } = props;
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
                  onClick={(event) => scrollTo(event, 'home')}
                >
                  AUTHOR
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="c-pointer"
                  href="#scroll"
                  onClick={(event) => scrollTo(event, 'recipies')}
                >
                  RECIPE
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="c-pointer"
                  href="#scroll"
                  onClick={(event) => scrollTo(event, 'contest')}
                >
                  CONTEST
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="c-pointer"
                  href="#scroll"
                  onClick={(event) => scrollTo(event, 'post')}
                >
                  POST
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="c-pointer"
                  href="#scroll"
                  onClick={(event) => scrollTo(event, 'member')}
                >
                  MEMBER
                </a>
              </li>
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
