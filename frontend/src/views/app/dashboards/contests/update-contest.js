import React from 'react';
import { Row } from 'reactstrap';
// import IntlMessages from 'helpers/IntlMessages';
import { Colxx } from 'components/common/CustomBootstrap';
import FormUpdateContest from 'containers/dashboards/ContestContainers/FormUpdateContest';


const UpdateContest = ({ contest, setSelectedContestUpdate }) => {
    return (
        <>
            <Row>
                <Colxx xxs="12">
                    <FormUpdateContest contest={contest} setSelectedContestUpdate={setSelectedContestUpdate} />
                </Colxx>
            </Row>
        </>
    );
};
export default UpdateContest;
