import React from 'react';
import { injectIntl } from 'react-intl';
import { Row } from 'reactstrap';
import { Colxx, Separator } from 'components/common/CustomBootstrap';
import Breadcrumb from 'containers/navs/Breadcrumb';
import Calendar from 'containers/dashboards/Calendar';
import RecentRecipe from 'containers/dashboards/RecipeContainers/defaultRecipe/RecentRecipe';
import IconCardsCarouselRecipe from 'containers/dashboards/RecipeContainers/IconCardsCarouselRecipe';
import ChartRecipeCategory from 'containers/dashboards/RecipeContainers/ChartRecipeCategory';
import HotRecipe from 'containers/dashboards/RecipeContainers/defaultRecipe/HotRecipe';

const DefaultDashboard= ({ match }) => {
  return (
    <>
      <Row>
        <Colxx xxs="12">
          <Breadcrumb heading="menu.default" match={match} />
          <Separator className="mb-5" />
        </Colxx>
      </Row>
      <Row>
        <Colxx lg="12" xl="6">
          <IconCardsCarouselRecipe />
          <Row>
            <Colxx md="12" className="mb-4">
              <ChartRecipeCategory />
            </Colxx>
          </Row>
        </Colxx>
        <Colxx lg="12" xl="6" className="mb-4">
          <RecentRecipe />
        </Colxx>
      </Row>
      <Row>
        <Colxx xl="6" lg="12" className="mb-4">
          <Calendar />
        </Colxx>
        <Colxx xl="6" lg="12" className="mb-4">
          <HotRecipe />
        </Colxx>
      </Row>
    </>
  );
};
export default injectIntl(DefaultDashboard);
