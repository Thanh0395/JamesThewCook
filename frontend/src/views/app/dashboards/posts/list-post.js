import React from 'react';
import { Row } from 'reactstrap';
import IntlMessages from 'helpers/IntlMessages';
import { Colxx, Separator } from 'components/common/CustomBootstrap';
import Breadcrumb from 'containers/navs/Breadcrumb';
import TablePost from 'containers/dashboards/PostContainers/PostTable';
// import {
//   ReactTableWithPaginationCard,
//   ReactTableDivided,
// } from 'containers/ui/ReactTableCards';

const ListRecipe = ({ match }) => {
  return (
    <>
      <Row>
        <Colxx xxs="12">
          <Breadcrumb heading="menu.list-post" match={match} />
          <Separator className="mb-5" />
        </Colxx>
      </Row>
      <Row>
        <Colxx xxs="12">
          <h2 className="mb-4">
            <IntlMessages id="table.list-recipe" />
          </h2>
        </Colxx>

        <Colxx xxs="12">

          <TablePost/>
        </Colxx>

        {/* <Colxx xxs="12">
          <ReactTableDivided />{' '}
        </Colxx> */}
      </Row>
    </>
  );
};
export default ListRecipe;
