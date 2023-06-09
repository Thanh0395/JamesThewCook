import React, { Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
// import { ProtectedRoute, UserRole } from 'helpers/authHelper';

const DashboardDefault = React.lazy(() =>
  import(/* webpackChunkName: "dashboard-default" */ './default')
);
const ContentDefault = React.lazy(() =>
  import(/* webpackChunkName: "dashboard-content" */ './content')
);
const AnalyticsDefault = React.lazy(() =>
  import(/* webpackChunkName: "dashboard-analytics" */ './analytics')
);
const EcommerceDefault = React.lazy(() =>
  import(/* webpackChunkName: "dashboard-ecommerce" */ './ecommerce')
);
/* Them o day */
const RecipesDefault = React.lazy(() =>
  import(/* webpackChunkName: "dashboard-ecommerce" */ './recipes')
);
const ContestDefault = React.lazy(() =>
  import(/* webpackChunkName: "dashboard-ecommerce" */ './contests')
);

const PostDefault = React.lazy(() =>
  import(/* webpackChunkName: "dashboard-ecommerce" */ './posts')
);

const UserDefault = React.lazy(() =>
  import(/* webpackChunkName: "dashboard-ecommerce" */ './users')
);

const Dashboards = ({ match }) => (
  <Suspense fallback={<div className="loading" />}>
    <Switch>
      <Redirect exact from={`${match.url}/`} to={`${match.url}/default`} />
      <Route
        path={`${match.url}/default`}
        render={(props) => <DashboardDefault {...props} />}
      />
      <Route
        path={`${match.url}/content`}
        render={(props) => <ContentDefault {...props} />}
      />
      <Route
        path={`${match.url}/ecommerce`}
        render={(props) => <EcommerceDefault {...props} />}
      />
      <Route
        path={`${match.url}/analytics`}
        render={(props) => <AnalyticsDefault {...props} />}
      />
      <Route
        path={`${match.url}/recipes`}
        render={(props) => <RecipesDefault {...props} />}
      />
      <Route
        path={`${match.url}/post`}
        render={(props) => <PostDefault {...props} />}
      />
      <Route
        path={`${match.url}/contests`}
        render={(props) => <ContestDefault {...props} />}
      />
      <Route
        path={`${match.url}/user`}
        render={(props) => <UserDefault {...props} />}
      />
      {/* <Route
        path={`${match.url}/contests/:id`}
        render={(props) => <ContestDefault {...props} />}
      /> */}
      {/* 
      <ProtectedRoute
        path={`${match.url}/default`}
        component={DashboardDefault}
        roles={[UserRole.Admin]}
      />
      <ProtectedRoute
        path={`${match.url}/content`}
        component={ContentDefault}
        roles={[UserRole.Admin]}
      />
      <ProtectedRoute
        path={`${match.url}/ecommerce`}
        component={EcommerceDefault}
        roles={[UserRole.Editor]}
      />
      <ProtectedRoute
        path={`${match.url}/analytics`}
        component={AnalyticsDefault}
        roles={[UserRole.Editor]}
      />
      */}

      <Redirect to="/error" />
    </Switch>
  </Suspense>
);
export default Dashboards;
