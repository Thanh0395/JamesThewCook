// import axios from 'axios';
import classNames from 'classnames';
// import { getCurrentUser } from 'helpers/Utils';
import React, { useState } from 'react';
// import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import { Nav, NavItem, TabContent, TabPane } from 'reactstrap';
import PopupMember from './PopupMember';
import './Popup.css'

function HomeMember(props) {
  const { toggle, members, activeTab } = props;
  // pop up dang ki member
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [propMonth, setPropMonth] = useState();

  const closePopup = () => {
    setPopupOpen(false);
  };

  // end popup
  const handlechargeMembership = async (month) => {
    setPopupOpen(true);
    setPropMonth(month)
  }
  return (
    <div className="container" id="member">
      {/* Popup */}
      <div>
        <PopupMember isOpen={isPopupOpen} onClose={closePopup} month={propMonth}/>
      </div>
      {/* End popup */}
      <div className="row">
        <div className="col-12 offset-0 col-lg-8 offset-lg-2 text-center">
          <h1>Membership</h1>
          <p className="section-text">
            <strong>Join Our Foodie Community: Register to Unlock a World of Culinary Delights</strong><br />
            <strong>Click on the image to join us</strong>
          </p>
        </div>
      </div>
      <div className="row screenshots">
        <div className="col-12 text-center">
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
                <button
                  type="button"
                  style={{ border: 'none', padding: 0, background: 'none', cursor: 'pointer' }}
                  onClick={() => handlechargeMembership(app.month)}
                >
                  <img alt={app.title} src={app.img} />
                </button>
              </TabPane>
            ))}
          </TabContent>
        </div>
      </div>
    </div>
  );
}

export default HomeMember;
