import classNames from 'classnames';
import React from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import { Nav, NavItem, TabContent, TabPane } from 'reactstrap';

function Applications(props) {
  const { toggle, applications, activeTab} = props;
  return (
    <div className="container" id="apps">
      <div className="row">
        <div className="col-12 offset-0 col-lg-8 offset-lg-2 text-center mb-4">
          <h1>Applications</h1>
          <p className="section-text">
            With the help of components and layouts, we created four different
            applications. They are a good way to get you started if you want to
            build something similar.
          </p>
        </div>
      </div>
      <div className="row screenshots">
        <div className="col-12 text-center mb-4">
          <Nav tabs className="justify-content-center">
            {applications.map((app, index) => (
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
            {applications.map((app, index) => (
              // eslint-disable-next-line react/no-array-index-key
              <TabPane key={`app_tab_${index}`} tabId={index}>
                <Link to={app.path}>
                  <img alt={app.title} src={app.img} className="app-image" />
                </Link>
              </TabPane>
            ))}
          </TabContent>
        </div>
      </div>
    </div>
  );
}

export default Applications;
