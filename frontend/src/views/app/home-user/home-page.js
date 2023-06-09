import React, { useState } from 'react';
import {
  Row,
  // Card,
  // CardBody,
  Nav,
  NavItem,
  // UncontrolledDropdown,
  // DropdownToggle,
  // DropdownItem,
  // DropdownMenu,
  TabContent,
  TabPane,
  // Badge,
  // CardTitle,
} from 'reactstrap';
import { NavLink } from 'react-router-dom';
import classnames from 'classnames';
// import GalleryDetail from 'containers/pages/GalleryDetail';
// import GalleryProfile from 'containers/pages/GalleryProfile';
import Breadcrumb from 'containers/navs/Breadcrumb';
import { Colxx } from 'components/common/CustomBootstrap';
// import IntlMessages from 'helpers/IntlMessages';
// import SingleLightbox from 'components/pages/SingleLightbox';
// import whotoFollowData from 'data/follow';
// import UserFollow from 'components/common/UserFollow';
import UserCardBasic from 'components/cards/UserCardBasic';
import HomeRecipes from 'containers/HomeUserContainer/HomeRecipes';
import PostAndContest from 'containers/HomeUserContainer/PostContest';
import HomeAuthor from 'containers/HomeUserContainer/HomeAuthor';
// import recentPostsData from 'data/recentposts';
// import RecentPost from 'components/common/RecentPost';
// import posts from 'data/posts';
// import Post from 'components/cards/Post';

// const friendsData = whotoFollowData.slice();
// const followData = whotoFollowData.slice(0, 5);

const HomePage = ({ match }) => {
  const [activeTab, setActiveTab] = useState('recipes');
  return (
    <>
      <Row>
        <Colxx xxs="12">
          <h1>Home Page </h1>
          <Breadcrumb match={match} />
          <Nav tabs className="separator-tabs ml-0 mb-5">
            <NavItem>
              <NavLink
                className={classnames({
                  active: activeTab === 'authors',
                  'nav-link': true,
                })}
                onClick={() => setActiveTab('authors')}
                to="#"
                location={{}}
              >
                Author
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={classnames({
                  active: activeTab === 'recipes',
                  'nav-link': true,
                })}
                onClick={() => setActiveTab('recipes')}
                to="#"
                location={{}}
              >
                Recipes
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={classnames({
                  active: activeTab === 'News',
                  'nav-link': true,
                })}
                onClick={() => setActiveTab('News')}
                to="#"
                location={{}}
              >
                News
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={classnames({
                  active: activeTab === 'friends',
                  'nav-link': true,
                })}
                onClick={() => setActiveTab('friends')}
                to="#"
                location={{}}
              >
                Winner
              </NavLink>
            </NavItem>
          </Nav>

          <TabContent activeTab={activeTab}>
            <TabPane tabId="authors">
              <HomeAuthor />
            </TabPane>
            <TabPane tabId="recipes">
              <HomeRecipes activeTab={activeTab} />
            </TabPane>
            <TabPane tabId="News">
              <PostAndContest />
            </TabPane>
            <TabPane tabId="friends">
              <Row>
                <Colxx xxs="12" md="6" lg="4">
                  <UserCardBasic/>
                </Colxx>
              </Row>
            </TabPane>
          </TabContent>
        </Colxx>
      </Row>
    </>
  );
};
export default HomePage;
