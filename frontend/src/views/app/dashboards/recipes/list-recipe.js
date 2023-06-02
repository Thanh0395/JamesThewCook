import React from 'react';
import { Row } from 'reactstrap';
import IntlMessages from 'helpers/IntlMessages';
import { Colxx, Separator } from 'components/common/CustomBootstrap';
import Breadcrumb from 'containers/navs/Breadcrumb';
import TableListRecipe from 'containers/dashboards/RecipeContainers/TableListRecipe';
// import {
//   ReactTableWithPaginationCard,
//   ReactTableDivided,
// } from 'containers/ui/ReactTableCards';

const ListRecipe = ({ match }) => {
  return (
    <>
      <Row>
        <Colxx xxs="12">
          <Breadcrumb heading="menu.list-recipe" match={match} />
          <Separator className="mb-5" />
        </Colxx>
      </Row>
      <Row>
        <Colxx xxs="12">
          <h3 className="mb-4">
            <IntlMessages id="table.list-recipe" />
          </h3>
        </Colxx>

        <Colxx xxs="12">
          <TableListRecipe match={ match }/>
        </Colxx>

        {/* <Colxx xxs="12">
          <ReactTableDivided />{' '}
        </Colxx> */}
      </Row>
    </>
  );
};
export default ListRecipe;
