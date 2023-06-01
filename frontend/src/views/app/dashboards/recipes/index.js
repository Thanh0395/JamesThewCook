import React, { Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
// import { ProtectedRoute, UserRole } from 'helpers/authHelper';

const RecipesDefault = React.lazy(() =>
  import(/* webpackChunkName: "dashboard-default" */ './default')
);
const RecipesListRecipe = React.lazy(() =>
  import(/* webpackChunkName: "dashboard-content" */ './list-recipe')
);
const RecipiesCreateRecipe = React.lazy(() =>
import(/* webpackChunkName: "dashboard-content" */ './create-recipe')
);

const RecipiesDetailRecipe = React.lazy(() =>
import(/* webpackChunkName: "dashboard-content" */ './detail-recipe')
);

const RecipiesUpdateRecipe = React.lazy(() =>
import(/* webpackChunkName: "dashboard-content" */ './update-recipe')
);

const Recipes = ({ match }) => (
  <Suspense fallback={<div className="loading" />}>
    <Switch>
      <Redirect exact from={`${match.url}/`} to={`${match.url}/default`} />
      <Route
        path={`${match.url}/default`}
        render={(props) => <RecipesDefault {...props} />}
      />
      <Route
        path={`${match.url}/list-recipe`}
        render={(props) => <RecipesListRecipe {...props} />}
      />
      <Route
        path={`${match.url}/create-recipe`}
        render={(props) => <RecipiesCreateRecipe {...props} />}
      />
      <Route
        path={`${match.url}/detail-recipe`}
        render={(props) => <RecipiesDetailRecipe{...props} />}
      />
      <Route
        path={`${match.url}/update-recipe`}
        render={(props) => <RecipiesUpdateRecipe{...props} />}
      />
      <Redirect to="/error" />
    </Switch>
  </Suspense>
);
export default Recipes;
// asda
