import React from 'react';
import { Row } from 'reactstrap';
import IntlMessages from 'helpers/IntlMessages';
import { Colxx, Separator } from 'components/common/CustomBootstrap';
import Breadcrumb from 'containers/navs/Breadcrumb';
import FormCreateContest from 'containers/dashboards/ContestContainers/FormCreateContest';


const contestCreate = ({ match }) => {
  return (
    <>
      <Row>
        <Colxx xxs="12">
          <Breadcrumb heading="menu.create-contest" match={match} />
          <Separator className="mb-5" />
        </Colxx>
      </Row>
      <Row>
        <Colxx xxs="12">
          <h3 className="mb-4">
            <IntlMessages id="table.list-contest" />
          </h3>
        </Colxx>

        <Colxx xxs="12">
            <FormCreateContest/>
        </Colxx>

        {/* <Colxx xxs="12">
          <ReactTableDivided />{' '}
        </Colxx> */}
      </Row>
    </>
  );
};
export default contestCreate;
