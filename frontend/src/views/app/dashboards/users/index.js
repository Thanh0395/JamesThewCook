import React, { Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
// import { ProtectedRoute, UserRole } from 'helpers/authHelper';

const ListUser = React.lazy(() =>
  import(/* webpackChunkName: "dashboard-default" */ './listUser')
);

const Users = ({ match }) => (
  <Suspense fallback={<div className="loading" />}>
    <Switch>
      <Redirect exact from={`${match.url}/`} to={`${match.url}/listuser`} />
      <Route
        path={`${match.url}/listuser`}
        render={(props) => <ListUser {...props} />}
      />
      <Redirect to="/error" />
    </Switch>
  </Suspense>
);
export default Users;
