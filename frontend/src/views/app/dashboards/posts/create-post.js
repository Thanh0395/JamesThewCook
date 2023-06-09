import React from 'react';
import { Row } from 'reactstrap';
import IntlMessages from 'helpers/IntlMessages';
import { Colxx, Separator } from 'components/common/CustomBootstrap';
import Breadcrumb from 'containers/navs/Breadcrumb';
// import TablePost from 'containers/dashboards/PostContainers/PostTable';
// import {
//    ReactTableWithPaginationCard,
//    ReactTableDivided,
// } from 'containers/ui/ReactTableCards';
import FormCreatePost from 'containers/dashboards/PostContainers/FormCreatePost';

const CreatePost = ({ match }) => {
  return (
    <>
<Row>
        <Colxx xxs="12">
          <Breadcrumb heading="menu.create-post" match={match} />
          <Separator className="mb-5" />
        </Colxx>
      </Row>
      <Row>
        <Colxx xxs="12">
          <h3 className="mb-4">
            <IntlMessages id="table.form-create-post" />
          </h3>
        </Colxx>

        <Colxx xxs="12">
            <FormCreatePost/>
        </Colxx>

        {/* <Colxx xxs="12">
          <ReactTableDivided />{' '}
        </Colxx> */}
      </Row>
    </>
  );
};  
export default CreatePost;
