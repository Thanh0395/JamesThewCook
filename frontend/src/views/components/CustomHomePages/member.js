import classNames from 'classnames';
import React from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import { Nav, NavItem, TabContent, TabPane } from 'reactstrap';

function HomeMember(props) {
  const { toggle, members, activeTab} = props;
  return (
    <div className="container" id="member">
      <div className="row">
        <div className="col-12 offset-0 col-lg-8 offset-lg-2 text-center mb-4">
          <h1>members</h1>
          <p className="section-text">
            <strong>Join Our Foodie Community: Register to Unlock a World of Culinary Delights</strong>
          </p>
        </div>
      </div>
      <div className="row screenshots">
        <div className="col-12 text-center mb-4">
          <Nav tabs className="justify-content-center">
            {members.map((app, index) => (
              // eslint-disable-next-line react/no-array-index-key
              <NavItem key={`app_nav_${index}`}>
                <a
                  href="#tab"
                  className={classNames({
                    'nav-link': true,
                    active: activeTab === index,
                  })}
                  onClick={(event) => {
                    event.preventDefault();
                    toggle(index);
                  }}
                >
                  {app.title}
                </a>
              </NavItem>
            ))}
          </Nav>
          <TabContent activeTab={activeTab}>
            {members.map((app, index) => (
              // eslint-disable-next-line react/no-array-index-key
              <TabPane key={`app_tab_${index}`} tabId={index}>
                <Link to={app.path}>
                  <img alt={app.title} src={app.img} />
                </Link>
              </TabPane>
            ))}
          </TabContent>
        </div>
      </div>
    </div>
  );
}

export default HomeMember;
