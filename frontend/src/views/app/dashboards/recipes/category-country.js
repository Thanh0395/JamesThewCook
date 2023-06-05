import React from 'react';
import { Row } from 'reactstrap';
// import IntlMessages from 'helpers/IntlMessages';
import { Colxx, Separator } from 'components/common/CustomBootstrap';
import Breadcrumb from 'containers/navs/Breadcrumb';
import TableListCategory from 'containers/dashboards/RecipeContainers/category/TableListCategory';
import TableListCountry from 'containers/dashboards/RecipeContainers/country/TableListCountry';
// import {
//   ReactTableWithPaginationCard,
//   ReactTableDivided,
// } from 'containers/ui/ReactTableCards';

const CategoryAndCountry = ({ match }) => {
  return (
    <>
      <Row>
        <Colxx xxs="12">
          <Breadcrumb heading="menu.category-country" match={match} />
          <Separator className="mb-5" />
        </Colxx>
      </Row>
      <Row>
        {/* <Colxx xxs="12">
          <h3 className="mb-4">
            <IntlMessages id="table.list-recipe" />
          </h3>
        </Colxx> */}

        <Colxx xxs="12" md="12" xl="6" className="col-left">
          <TableListCategory match={ match }/>
        </Colxx>
        <Colxx xxs="12" md="12" xl="6" className="col-left">
          <TableListCountry match={ match }/>
        </Colxx>

        {/* <Colxx xxs="12">
          <ReactTableDivided />{' '}
        </Colxx> */}
      </Row>
    </>
  );
};
export default CategoryAndCountry;
