/* eslint-disable react/no-array-index-key */
import React from 'react';
import { Row, Card, CardBody } from 'reactstrap';

import Breadcrumb from 'containers/navs/Breadcrumb';
import { Separator, Colxx } from 'components/common/CustomBootstrap';
import SingleLightbox from 'components/pages/SingleLightbox';

const DetailPostUser = ({ match, location }) => {
  const post = location.state && location.state.post;
  return (
    <>
      <Row>
        <Colxx xxs="12">
          <Breadcrumb heading="menu.detail-post" match={match} />
          <Separator className="mb-5" />
        </Colxx>
      </Row>
      {post && (
        <Row>
        <Colxx xxs="12" md="12" xl="8" className="col-left">
          <Card className="mb-4">
            <SingleLightbox
              thumb={`http://localhost:5013${post.featureImage}`}
              large={`http://localhost:5013${post.featureImage}`}
              className="responsive border-0 card-img-top mb-3"
            />
            <CardBody>
              <div className="mb-5">
                <h2><strong>{post.title}</strong></h2>
                <div>
                  <h5><strong>Type</strong></h5>
                  <p>
                    {post.type}
                  </p>
                </div>
                <div>
                  <h5><strong>Directions</strong></h5>
                  <p>
                    {post.content}
                  </p>
                </div>
              </div>
            </CardBody>
          </Card>
        </Colxx>
      </Row>
      )}
    </>
  );
};

export default DetailPostUser;
