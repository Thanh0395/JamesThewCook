import React from 'react';
import { NavLink } from 'react-router-dom/cjs/react-router-dom.min';
import { Button } from 'reactstrap';

function HomeContest(props) {
  const { contest, currentUser } = props;
  console.log('currentUser', currentUser);
  console.log('contest', contest);
  const renderButton = (to, text, disabled) => {
    if (disabled) {
      return (
        <Button color="primary" size="xs" className="mb-2" disabled>
          <h6>
            <i>{text}</i>
          </h6>
        </Button>
      );
    }

    return (
      <Button color="primary" size="xs" className="mb-2">
        <NavLink to={to}>
          <h6>
            <i>{text}</i>
          </h6>
        </NavLink>
      </Button>
    );
  };
  return (
    <div className="container" id="contest">
      <div className="row">
        <div className="col-12 offset-0 col-lg-8 offset-lg-2 text-center">
          <h1>Contest</h1>
          <p>
            <strong>
              Unleash Your Culinary Creativity: Join Our Recipe Creation Contest
              Today!
            </strong>
          </p>
        </div>
      </div>

      <div className="row pt-5">
        {contest.map((l, index) => {
          return (
            <div
              /* eslint-disable-next-line react/no-array-index-key */
              key={`layout_${index}`}
              className="col-12 col-xs-6 col-sm-6 col-md-4 col-lg-3 mb-5"
            >
              <img
                className="img-fluid border-radius depth-2 mb-3 semi-rounded"
                alt={l.title}
                src={`http://localhost:5013${l.featureImage}`}
              />
              {l.endDate &&
                renderButton('/app/home-user/home-page', 'End', true)}
              {!l.endDate &&
                (currentUser
                  ? renderButton('/app/home-user/home-page', 'Compete', false)
                  : renderButton('/login', 'Compete', false))}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default HomeContest;
