import React from 'react';
import { Row } from 'reactstrap';
// import IntlMessages from 'helpers/IntlMessages';
import { Colxx } from 'components/common/CustomBootstrap';
import ViewAllSC from 'containers/dashboards/ContestContainers/ViewAllSC';
// import { GetSc } from 'services/Sy_Api/SCApi';

const ViewContest = ({ viewContest, setViewContest, sc}) => {
  
  return (
    <>
      <Row>
        <Colxx xxs="12">
          <ViewAllSC
            viewContest={viewContest}
            setViewContest={setViewContest}
            sc = {sc}
          />
        </Colxx>
      </Row>
    </>
  );
};
export default ViewContest;
