import React, { Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
// import { ProtectedRoute, UserRole } from 'helpers/authHelper';

const HomePage = React.lazy(() =>
  import(/* webpackChunkName: "dashboard-default" */ './home-page')
);

const ProfileUser = React.lazy(() =>
import(/* webpackChunkName: "dashboard-default" */ './profie-user')
);

const HomePageUser = ({ match }) => (
  <Suspense fallback={<div className="loading" />}>
    <Switch>
      <Redirect exact from={`${match.url}/`} to={`${match.url}/home-page`} />
      <Route
        path={`${match.url}/home-page`}
        render={(props) => <HomePage {...props} />}
      />
      <Route
        path={`${match.url}/profile-user`}
        render={(props) => <ProfileUser {...props} />}
      />
      <Redirect to="/error" />
    </Switch>
  </Suspense>
);
export default HomePageUser;
