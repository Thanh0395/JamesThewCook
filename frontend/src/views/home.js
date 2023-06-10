/* eslint-disable react/no-array-index-key, react/no-danger */
import React, { useState, useEffect, useRef } from 'react';
// import { Nav, NavItem, TabContent, TabPane } from 'reactstrap';
// import { NavLink } from 'react-router-dom';
import classnames from 'classnames';
import { scroller } from 'react-scroll';
// import Headroom from 'react-headroom';
// import GlideComponent from 'components/carousel/GlideComponent';
import { buyUrl, adminRoot } from 'constants/defaultValues';
// import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import Navbar from './components/Navbar';
import NavbarDT from './components/NavbarDT';
import Carousel from './components/Carousel';
// import FeaturesAtAGlance from './components/FeaturesAtAGlance';
// import Layouts from './components/Layouts';
// import Components from './components/Components';
// import Applications from './components/Applications';
import Themes from './components/Themes';
import Footer from './components/Footer';
import BuyNow from './components/BuyNow';
import HomeRecipe from './components/CustomHomePages/Recipe';
import HomeContest from './components/CustomHomePages/Contest';
import HomePost from './components/CustomHomePages/Post';
import HomeMember from './components/CustomHomePages/member';

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

const slideItems = [
  {
    icon: 'iconsminds-mouse-3',
    title: 'Right Click Menu',
    detail:
      'Certainly! I can review many of your cooking recipes.',
  },
  {
    icon: 'iconsminds-electric-guitar',
    title: 'Video Player',
    detail:
      'Discover Unique Cooking Techniques through Engaging Videos.',
  },
  {
    icon: 'iconsminds-keyboard',
    title: 'Social',
    detail:
      'Join Us in Building a Thriving Community for Recipes and Cooking Tips.',
  },
  {
    icon: 'simple-icon-trophy ',
    title: 'Prizes',
    detail:
      'Participate in Multiple Cooking Contests and Unleash Your Creativity.',
  },
  {
    icon: 'simple-icon-diamond',
    title: 'Member',
    detail:
      'Join Us as a Member to Enjoy Delicious Eats.',
  },
  // {
  //   icon: 'iconsminds-palette',
  //   title: '20 Color Schemes',
  //   detail:
  //     'Colors, icons and design harmony that creates excellent themes to cover entire project.',
  // },
  // {
  //   icon: 'iconsminds-air-balloon-1',
  //   title: '3 Applications',
  //   detail:
  //     'Applications that mostly made of components are the way to get started to create something similar.',
  // },
  // {
  //   icon: 'iconsminds-resize',
  //   title: 'Extra Responsive',
  //   detail:
  //     'Custom Bootstrap 4 xxs & xxl classes delivers better experiences for smaller and larger screens.',
  // },
];

const recipies = [
  {
    title: 'Italian recipes',
    img: '/assets/img/landing-page/recipes/pasta-1.jpg',
    detail: 'Indulge in the Flavors of Italy<br></br> Unique Italian Recipes from the Land of Pizza and Pasta.',
  },
  {
    title: 'Vegetarian recipes,',
    img: '/assets/img/landing-page/recipes/vegetarian-sala2.jpg',
    detail:
      'Plant-based Delights: Creative Recipes for Vegetarians<br></br>Exciting and Colorful Vegetarian Recipes',
  },
  {
    title: 'Quick and Easy Recipes',
    img: '/assets/img/landing-page/recipes/quick-easy-1.jpg',
    detail:
      'Explore hundreds of top-rated quick and easy recipes for breakfast, lunch, and dinner.',
  },
  {
    title: 'Dessert Recipes',
    img: '/assets/img/landing-page/recipes/dessert-1.jpg',
    detail:
      'Discover more than 16,470 recipes that showcase desserts in all forms, from fresh seasonal fruits to frozen, canned, dried–even freeze-dried!',
  },
  // {
  //   title: 'Smart Menu',
  //   img: '/assets/img/landing-page/features/smart-menu.png',
  //   detail:
  //     'Instead of good old single panel menus with accordion structure that looks over complicated, we created 2 panels and categorized pages accordingly.<br><br>The default menu auto hides sub panel when resolution is under some breakpoint to open some space. You may also hide menu completely or use only main panel open only.',
  // },
];

const contest = [
  {
    title: 'California Contest',
    img: '/assets/img/landing-page/contests/contest-1.jpg',
  },
  {
    title: 'Holdiday Contest',
    img: '/assets/img/landing-page/contests/contest-3.jpg',
  },
  {
    title: 'National Contest',
    img: '/assets/img/landing-page/contests/contest-7.jpg',
  },
  {
    title: 'Newest Contest',
    img: '/assets/img/landing-page/contests/contest-4.jpg', 
  },
  // {
  //   title: 'Thumb List',
  //   img: '/assets/img/landing-page/layouts/thumb-list.jpg',
  // },
  // { title: 'Data List', img: '/assets/img/landing-page/layouts/data-list.jpg' },
  // { title: 'Details', img: '/assets/img/landing-page/layouts/details.jpg' },
  // {
  //   title: 'Authentication',
  //   img: '/assets/img/landing-page/layouts/authentication.jpg',
  // },
  // {
  //   title: 'Search Results',
  //   img: '/assets/img/landing-page/layouts/search-result.jpg',
  // },
  // {
  //   title: 'Single Page Application',
  //   img: '/assets/img/landing-page/layouts/spa.jpg',
  // },
  // {
  //   title: 'Data List App Menu Hidden',
  //   img: '/assets/img/landing-page/layouts/data-list-app-menu-hidden.jpg',
  // },
  // { title: 'Tabs', img: '/assets/img/landing-page/layouts/tabs.jpg' },
];

const members = [
  {
    title: 'One-Month',
    path: `${adminRoot}/applications/survey`,
    img: '/assets/img/landing-page/members/member-1.jpg',
    month: 1,
    fee: 10,
  },
  {
    title: 'One-Year',
    path: `${adminRoot}/applications/chat`,
    img: '/assets/img/landing-page/members/member-2.jpg',
    month: 12,
    fee: 100,
  },
  // {
  //   title: 'Todo',
  //   path: `${adminRoot}/applications/todo`,
  //   img: '/assets/img/landing-page/applications/todo.jpg',
  // },
];

const themes = [
  { title: 'Navy Blue', class: 'bluenavy' },
  { title: 'Olympic Blue', class: 'blueolympic' },
  { title: 'Yale Blue', class: 'blueyale' },
  { title: 'Moss Green', class: 'greenmoss' },
  { title: 'Lime Green', class: 'greenlime' },
  { title: 'Carrot Orange', class: 'carrotorange' },
  { title: 'Ruby Red', class: 'rubyred' },
  { title: 'Monster Purple', class: 'monsterpurple' },
  { title: 'Steel Grey', class: 'steelgrey' },
  { title: 'Granola Yellow', class: 'granolayellow' },
];

const Home = () => {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const refRowHome = useRef(null);
  const refSectionHome = useRef(null);
  const refSectionFooter = useRef(null);
  const [activeTab, setActiveTab] = useState(0);

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

  const toggle = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  return (
    <div
      className={classnames('landing-page', {
        'show-mobile-menu': showMobileMenu,
      })}
    >
      <NavbarDT scrollTo={scrollTo} />
      <div className="main-container">
        <Navbar
          scrollTo={scrollTo}
          showMobileMenu={showMobileMenu}
          setShowMobileMenu={setShowMobileMenu}
        />
        <div className="content-container" id="home">
          <Carousel
            scrollTo={scrollTo}
            refRowHome={refRowHome}
            refSectionHome={refSectionHome}
            slideItems={slideItems}
            slideSettings={slideSettings}
          />
          <div className="section">
            <HomeRecipe recipies={recipies} />
          </div>

          <div className="section background">
            <HomeContest contest={contest} />
          </div>

          <div className="section mb-0">
            <HomePost />
          </div>

          <div className="section background">
            <HomeMember
              toggle={toggle}
              members={members}
              activeTab={activeTab}
            />
          </div>

          <div hidden = "hidden" className="section mb-0">
            <Themes themes = {themes}/>
          </div>

          <div hidden = "hidden" className="section background background-no-bottom mb-0 pb-0">
            <BuyNow buyUrl = {buyUrl}/>
          </div>

          <div className="section footer mb-0" ref={refSectionFooter}>
            <Footer scrollTo = {scrollTo}/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
