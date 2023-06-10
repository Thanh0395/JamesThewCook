import React, { Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
// import { ProtectedRoute, UserRole } from 'helpers/authHelper';

const ContestDefault = React.lazy(() =>
  import(/* webpackChunkName: "dashboard-default" */ './default')
);
const ContestCreate = React.lazy(() =>
  import(/* webpackChunkName: "dashboard-default" */ './create-contest')
);
const DetailContest = React.lazy(() =>
  import(/* webpackChunkName: "dashboard-default" */ './detail-contest')
);

const Contest = ({ match }) => (
  <Suspense fallback={<div className="loading" />}>
    <Switch>
      <Redirect exact from={`${match.url}/`} to={`${match.url}/default`} />
      <Route
        path={`${match.url}/default`}
        render={(props) => <ContestDefault {...props} />}
      />
      <Route
        path={`${match.url}/create-contest`}
        render={(props) => <ContestCreate {...props} />}
      />
      <Route
        path={`${match.url}/detail-contest`}
        render={(props) => <DetailContest {...props} />}  
      />
      <Redirect to="/error" />
    </Switch>
  </Suspense>
);
export default Contest;
