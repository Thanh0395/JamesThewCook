import { buyUrl } from 'constants/defaultValues';
import React from 'react';
import { Link } from 'react-scroll';

function NavbarDT(props) {
  const { scrollTo} = props;
  return (
    <div>
      {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */}
      <div className="mobile-menu" onClick={(event) => event.stopPropagation()}>
        <a
          className="logo-mobile c-pointer"
          href="#scroll"
          onClick={(event) => scrollTo(event, 'home')}
        >
          <span />
        </a>
        <ul className="navbar-nav">
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
          <li className="nav-item">
            <div className="separator" />
          </li>
          <Link to="/app/dashboards/default" className="nav-item text-center">
            <a
              className="btn btn-outline-primary btn-sm mobile-menu-cta"
              target="_blank"
              rel="noopener noreferrer"
              href={buyUrl}
            >
              BUY
            </a>
          </Link>
        </ul>
      </div>
    </div>
  );
}

export default NavbarDT;
