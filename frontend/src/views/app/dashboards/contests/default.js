import React from 'react';
import { injectIntl } from 'react-intl';
import { Row } from 'reactstrap';
import { Colxx, Separator } from 'components/common/CustomBootstrap';
import Breadcrumb from 'containers/navs/Breadcrumb';
import IntlMessages from 'helpers/IntlMessages';
import TableListContest from 'containers/dashboards/ContestContainers/TableListContest';

const DefaultContest = ({ match }) => {
  return (
    <>
      <Row>
        <Colxx xxs="12">
          <Breadcrumb heading="menu.list-contest" match={match} />
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
            <TableListContest/>
        </Colxx>
      </Row>
    </>
  );
};
export default injectIntl(DefaultContest);
