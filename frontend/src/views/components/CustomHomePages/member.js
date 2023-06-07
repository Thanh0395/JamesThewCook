import axios from 'axios';
import classNames from 'classnames';
import { getCurrentUser} from 'helpers/Utils';
import React from 'react';
// import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import { Nav, NavItem, TabContent, TabPane } from 'reactstrap';

function HomeMember(props) {
  const { toggle, members, activeTab } = props;
  const handlechargeMembership = async (month) => {
    if (getCurrentUser() != null) {
      const userToken = getCurrentUser().token;
      const Uid = getCurrentUser().uid;
      try {
        const response = await axios.get(`http://localhost:5013/api/Membership?UserID=${Uid}&month=${month}`, {
          headers: {
            'Authorization': `Bearer ${userToken}`,
            'Content-Type': 'application/json'
          }
        });
        if (response.data.data !== null) {
          const text = `You paid for ${month} month. ${response.data.message}!. Please relogin`
          window.confirm(text)
          // setCurrentUser()
          window.location.href = "/login";
        } else {
          alert(response.data.message)
        }
      } catch (error) {
        alert("Login to payment")
      }
    } else {
      const text = `Please register to pay for membership`
      if (window.confirm(text) === true) {
        window.location.href = "/user/register";
      } 
    }
  }
  return (
    <div className="container" id="member">
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
