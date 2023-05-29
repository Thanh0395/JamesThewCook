import GlideComponent from 'components/carousel/GlideComponent';
import { adminRoot } from 'constants/defaultValues';
import React, { useEffect, useRef, useState } from 'react';
import { NavLink } from 'react-router-dom/cjs/react-router-dom.min';
import { scroller } from 'react-scroll';

const Tacgia = () => {
  const [setShowMobileMenu] = useState(false);
  const refRowHome = useRef(null);
  const refSectionHome = useRef(null);
  const refSectionFooter = useRef(null);

  const onWindowResize = (event) => {
    const homeRect = refRowHome.current.getBoundingClientRect();

    const homeSection = refSectionHome.current;
    homeSection.style.backgroundPositionX = `${homeRect.x - 580}px`;

    const footerSection = refSectionFooter.current;
    footerSection.style.backgroundPositionX = `${
      event.target.innerWidth - homeRect.x - 2000
    }px`;

    if (event.target.innerWidth >= 992) {
      setShowMobileMenu(false);
    }
  };

  const onWindowClick = () => {
    setShowMobileMenu(false);
  };

  const onWindowScroll = () => {
    setShowMobileMenu(false);
  };

  useEffect(() => {
    window.addEventListener('scroll', onWindowScroll);
    window.addEventListener('resize', onWindowResize);
    window.addEventListener('click', onWindowClick);

    document.body.classList.add('no-footer');
    return () => {
      window.removeEventListener('scroll', onWindowScroll);
      window.removeEventListener('resize', onWindowResize);
      window.removeEventListener('click', onWindowClick);
      document.body.classList.remove('no-footer');
    };
  }, []);

  const scrollTo = (event, target) => {
    event.preventDefault();
    scroller.scrollTo(target, {
      duration: 500,
      delay: 0,
      smooth: 'easeInOutQuart',
      offset: -100,
    });
    return false;
  };
  const slideItems = [
    {
      icon: 'iconsminds-mouse-3',
      title: 'Right Click Menu',
      detail:
        'Increases overall usability of the project by providing additional actions menu.',
    },
    {
      icon: 'iconsminds-electric-guitar',
      title: 'Video Player',
      detail:
        'Carefully themed multimedia players powered by Video.js library with Youtube support.',
    },
    {
      icon: 'iconsminds-keyboard',
      title: 'Keyboard Shortcuts',
      detail:
        'Easily configurable keyboard shortcuts plugin that highly improves user experience.',
    },
    {
      icon: 'iconsminds-three-arrow-fork ',
      title: 'Two Panels Menu',
      detail:
        'Three states two panels icon menu that looks good, auto resizes and does the job well.',
    },
    {
      icon: 'iconsminds-deer',
      title: 'Icons Mind',
      detail:
        '1040 icons in 53 different categories, designed pixel perfect and ready for your project.',
    },
    {
      icon: 'iconsminds-palette',
      title: '20 Color Schemes',
      detail:
        'Colors, icons and design harmony that creates excellent themes to cover entire project.',
    },
    {
      icon: 'iconsminds-air-balloon-1',
      title: '3 Applications',
      detail:
        'Applications that mostly made of components are the way to get started to create something similar.',
    },
    {
      icon: 'iconsminds-resize',
      title: 'Extra Responsive',
      detail:
        'Custom Bootstrap 4 xxs & xxl classes delivers better experiences for smaller and larger screens.',
    },
  ];

  const slideSettings = {
    type: 'carousel',
    gap: 30,
    perView: 4,
    hideNav: true,
    peek: { before: 10, after: 10 },
    breakpoints: {
      600: { perView: 1 },
      992: { perView: 2 },
      1200: { perView: 3 },
    },
  };
  return (
    <div>
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
                  MAGIC IS IN <br />
                  THE DETAILS
                </div>
                <p className="white mb-5">
                  Gogo is the combination of good design, quality code and
                  attention for details.
                  <br />
                  <br />
                  We used same design language for components, layouts, apps and
                  other parts of the template. <br />
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
                          <h5 className="mb-3 font-weight-semibold">
                            {f.title}
                          </h5>
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
    </div>
  );
};

export default Tacgia;
