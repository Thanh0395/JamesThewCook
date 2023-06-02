import React, { Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
// import { ProtectedRoute, UserRole } from 'helpers/authHelper';

const PostDefault = React.lazy(() =>
  import(/* webpackChunkName: "dashboard-default" */ './default')
);
const PostList = React.lazy(() =>
  import(/* webpackChunkName: "dashboard-default" */ './list-post')
);

const Posts = ({ match }) => (
  <Suspense fallback={<div className="loading" />}>
    <Switch>
      <Redirect exact from={`${match.url}/`} to={`${match.url}/default`} />
      <Route
        path={`${match.url}/default`}
        render={(props) => <PostDefault {...props} />}
      />
       <Route
        path={`${match.url}/list-post`}
        render={(props) => <PostList {...props} />}
      />
      <Redirect to="/error" />
    </Switch>
  </Suspense>
);
export default Posts;
// asda
