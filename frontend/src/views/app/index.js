import React, { Suspense } from 'react';
import { Route, withRouter, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import AppLayout from 'layout/AppLayout';
import { ProtectedRoute } from 'helpers/authHelper';
import { UserRole } from 'constants/defaultValues';
import { getCurrentUser } from 'helpers/Utils';
// import { ProtectedRoute, UserRole } from 'helpers/authHelper';

const Dashboards = React.lazy(() =>
  import(/* webpackChunkName: "dashboards" */ './dashboards')
);
// const Pages = React.lazy(() =>
//   import(/* webpackChunkName: "pages" */ './pages')
// );
const Applications = React.lazy(() =>
  import(/* webpackChunkName: "applications" */ './applications')
);
const Ui = React.lazy(() => import(/* webpackChunkName: "ui" */ './ui'));
const Pages = React.lazy(() => import(/* webpackChunkName: "ui" */ './pages'));
const Menu = React.lazy(() => import(/* webpackChunkName: "menu" */ './menu'));
const BlankPage = React.lazy(() =>
  import(/* webpackChunkName: "blank-page" */ './blank-page')
);
const HomeUser = React.lazy(() => import(/* webpackChunkName: "ui" */ './home-user'));
const FeedbackPage = React.lazy(() => import(/* webpackChunkName: "ui" */ './FeedbackPage'));
const FaqPage = React.lazy(() => import(/* webpackChunkName: "ui" */ './FaqPage'));
const MemberPage = React.lazy(() => import(/* webpackChunkName: "ui" */ './MemberPage'));

const App = ({ match }) => {
  const {role} = getCurrentUser();
  return (
    <AppLayout>
      <div className="dashboard-wrapper">
        <Suspense fallback={<div className="loading" />}>
          <Switch>
            {role === "admin" ? (
              <Redirect
              exact
              from={`${match.url}/`}
              to={`${match.url}/dashboards`}
            />
            ) : (
              <Redirect
              exact
              from={`${match.url}/`}
              to={`${match.url}/home-user`}
            />
            )}
            <ProtectedRoute
              path={`${match.url}/dashboards`}
              component={(props) => <Dashboards {...props} />}
              roles={[UserRole.Admin]}
            />
            <Route
              path={`${match.url}/home-user`}
              render={(props) => <HomeUser {...props} />}
            />
            <Route
              path={`${match.url}/feedback`}
              render={(props) => <FeedbackPage {...props} />}
            />
            <Route
              path={`${match.url}/faq`}
              render={(props) => <FaqPage {...props} />}
            />
            <Route
              path={`${match.url}/member`}
              render={(props) => <MemberPage {...props} />}
            />
            {/* <Route
              path={`${match.url}/applications`}
              render={(props) => <Applications {...props} />}
            /> */}
            <ProtectedRoute
              path={`${match.url}/applications`}
              component={(props) => <Applications {...props} />}
              roles={[UserRole.Admin]}
            />
            <Route
              path={`${match.url}/pages`}
              render={(props) => <Pages {...props} />}
            />
            <Route
              path={`${match.url}/ui`}
              render={(props) => <Ui {...props} />}
            />
            <Route
              path={`${match.url}/menu`}
              render={(props) => <Menu {...props} />}
            />
            <Route
              path={`${match.url}/blank-page`}
              render={(props) => <BlankPage {...props} />}
            />
            <Redirect to="/error" />
          </Switch>
        </Suspense>
      </div>
    </AppLayout>
  );
};

const mapStateToProps = ({ menu }) => {
  const { containerClassnames } = menu;
  return { containerClassnames };
};

export default withRouter(connect(mapStateToProps, {})(App));
