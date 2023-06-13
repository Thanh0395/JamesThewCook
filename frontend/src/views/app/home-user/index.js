import React, { Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
// import { ProtectedRoute, UserRole } from 'helpers/authHelper';

const HomePage = React.lazy(() =>
  import(/* webpackChunkName: "dashboard-default" */ './home-page')
);

const ProfileUser = React.lazy(() =>
import(/* webpackChunkName: "dashboard-default" */ './profie-user')
);

const CreateRecipeUser = React.lazy(() =>
import(/* webpackChunkName: "dashboard-default" */ './FormCreateRecipeUer')
);

const DetailRecipeUser = React.lazy(() =>
import(/* webpackChunkName: "dashboard-default" */ './DetailRecipeUser')
);

const CreatePostUser = React.lazy(() =>
import(/* webpackChunkName: "dashboard-default" */ './FormCreatePostUser')
);

const SearchUser = React.lazy(() =>
import(/* webpackChunkName: "dashboard-default" */ './SearchRecipeAndPost')
);

const DetailContestUser = React.lazy(() =>
import(/* webpackChunkName: "dashboard-default" */ './DetailContestUser')
);

const DetailPostUser = React.lazy(() =>
import(/* webpackChunkName: "dashboard-default" */ './DetailPostUser')
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
      <Route
        path={`${match.url}/create-recipe`}
        render={(props) => <CreateRecipeUser {...props} />}
      />
      <Route
        path={`${match.url}/create-post`}
        render={(props) => <CreatePostUser {...props} />}
      />
      <Route
        path={`${match.url}/detail-recipe`}
        render={(props) => <DetailRecipeUser {...props} />}
      />
      <Route
        path={`${match.url}/search`}
        render={(props) => <SearchUser {...props} />}
      />
      <Route
        path={`${match.url}/detail-contest`}
        render={(props) => <DetailContestUser {...props} />}
      />
      <Route
        path={`${match.url}/detail-post`}
        render={(props) => <DetailPostUser {...props} />}
      />
      <Redirect to="/error" />
    </Switch>
  </Suspense>
);
export default HomePageUser;
