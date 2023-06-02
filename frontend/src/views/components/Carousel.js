import GlideComponent from 'components/carousel/GlideComponent';
import { adminRoot } from 'constants/defaultValues';
import React from 'react';
import { NavLink } from 'reactstrap';

function Carousel(props) {
  const { scrollTo, refRowHome, refSectionHome, slideItems, slideSettings } = props;
  return (
    <div className="section home" ref={refSectionHome}>
      <div className="container">
        <div className="row home-row" ref={refRowHome}>
          <div className="col-12 d-block d-md-none">
            <NavLink to="/">
              <img
                alt="mobile hero"
                className="mobile-hero"
                src="/assets/img/landing-page/home-hero-mobile.png"
              />
            </NavLink>
          </div>

          <div className="col-12 col-xl-4 col-lg-5 col-md-6">
            <div className="home-text">
              <div className="display-1">
                JAMES THEW <br />
                COOK
              </div>
              <p className="white mb-5">
                is one of the famous cook working in one of the five star hotels in the
                city.
                <br />
                <br />
                He is so famous that the publishers approach him to write recipes book, and
                provide some of the tips pertaining to the recipes,... <br />
                <br />
                Hope you enjoy it!
              </p>
              {/* eslint-disable-next-line react/jsx-no-target-blank */}
              <a
                className="btn btn-light btn-xl mr-2 mb-2"
                href={adminRoot}
                target="_blank"
              >
                VIEW NOW <i className="simple-icon-arrow-right" />
              </a>
            </div>
          </div>
          <div className="col-12 col-xl-7 offset-xl-1 col-lg-7 col-md-6  d-none d-md-block">
            {/* eslint-disable-next-line react/jsx-no-target-blank */}
            <a href={adminRoot} target="_blank">
              <img alt="hero" src="/assets/img/landing-page/home-hero.png" />
            </a>
          </div>
        </div>

        <div className="row">
          <div className="col-12 p-0">
            <div className="home-carousel">
              <GlideComponent settings={slideSettings}>
                {slideItems.map((f, index) => (
                  // eslint-disable-next-line react/no-array-index-key
                  <div key={`slide_${index}`} className="card">
                    <div className="card-body text-center">
                      <div>
                        <i className={`${f.icon} large-icon`} />
                        <h5 className="mb-3 font-weight-semibold">{f.title}</h5>
                      </div>
                      <div>
                        <p className="detail-text">{f.detail}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </GlideComponent>
            </div>
          </div>
        </div>

        <div className="row">
          <a
            className="btn btn-circle btn-outline-semi-light hero-circle-button"
            href="#scroll"
            onClick={(event) => scrollTo(event, 'features')}
          >
            <i className="simple-icon-arrow-down" />
          </a>
        </div>
      </div>
    </div>
  );
}

export default Carousel;
