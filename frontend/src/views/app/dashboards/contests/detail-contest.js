import React, { useState } from 'react';
import {
  Row,
  Card,
  CardBody,
  Nav,
  NavItem,
  TabContent,
  TabPane,
  CardHeader,
  InputGroup,
  InputGroupAddon,
  Button,
} from 'reactstrap';
import { NavLink } from 'react-router-dom';
import classnames from 'classnames';
import { injectIntl } from 'react-intl';
import Breadcrumb from 'containers/navs/Breadcrumb';
import { Separator, Colxx } from 'components/common/CustomBootstrap';
import IntlMessages from 'helpers/IntlMessages';
// import GlideComponentThumbs from 'components/carousel/GlideComponentThumbs';
// import { detailImages, detailThumbs } from 'data/carouselItems';
// import detailsQuestionsData from 'data/questions';
import CommentWithLikes from 'components/pages/CommentWithLikes';
import { commentWithLikesData } from 'data/comments';
// import QuestionAnswer from 'components/pages/QuestionAnswer';
// import GalleryDetail from 'containers/pages/GalleryDetail';
import SingleLightbox from 'components/pages/SingleLightbox';

const DetailsPages = ({ match, location }) => {
  const { contest } = location.state;
  const [activeTab, setActiveTab] = useState('details');
  return (
    <>
      <Row>
        <Colxx xxs="12">
          <Breadcrumb match={match} />
          <Separator className="mb-5" />

          <Row>
            <Colxx xxs="12" xl="8" className="col-left">
              <Card className="mb-4">
                <SingleLightbox
                  thumb={`http://localhost:5013${contest.featureImage}`}
                  large={`http://localhost:5013${contest.featureImage}`}
                  className="responsive border-0 card-img-top mb-3"
                />
                <CardBody>
                  <div className="mb-5">
                    <h2>
                      <strong>{contest.title}</strong>
                    </h2>
                    <div>
                      <h5>
                        <strong>Description</strong>
                      </h5>
                      <p>{contest.description}</p>
                    </div>
                    <div>
                      <h5>
                        <strong>Prize</strong>
                      </h5>
                      <p>{contest.prize}</p>
                    </div>
                    <div>
                      <h5>
                        <strong>StartDate</strong>
                      </h5>
                      <p>{contest.startDate}</p>
                    </div>
                    <div>
                      <h5>
                        <strong>EndDate</strong>
                      </h5>
                      <p>{contest.endDate}</p>
                    </div>
                  </div>
                </CardBody>
              </Card>
              <Card className="mb-4">
                <CardHeader>
                  <Nav tabs className="card-header-tabs ">
                    <NavItem>
                      <NavLink
                        className={classnames({
                          active: activeTab === 'details',
                          'nav-link': true,
                        })}
                        onClick={() => setActiveTab('details')}
                        to="#"
                        location={{}}
                      >
                        <IntlMessages id="pages.contest-description" />
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        className={classnames({
                          active: activeTab === 'comments',
                          'nav-link': true,
                        })}
                        onClick={() => setActiveTab('comments')}
                        to="#"
                        location={{}}
                      >
                        <IntlMessages id="pages.contest-sc" />
                        (19)
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        className={classnames({
                          active: activeTab === 'questions',
                          'nav-link': true,
                        })}
                        onClick={() => setActiveTab('questions')}
                        to="#"
                        location={{}}
                      >
                        <IntlMessages id="pages.questions-title" />
                        (6)
                      </NavLink>
                    </NavItem>
                  </Nav>
                </CardHeader>
                <TabContent activeTab={activeTab}>
                  <TabPane tabId="details">
                    <Row>
                      <Colxx sm="12">
                        <CardBody>
                          <p className="font-weight-bold">
                            {contest.description}
                          </p>
                          <p>
                            Vivamus ultricies augue vitae commodo condimentum.
                            Nullamfaucibus eros eu mauris feugiat, eget
                            consectetur tortor tempus. Sed volutpatmollis dui
                            eget fringilla. Vestibulum blandit urna ut tellus
                            lobortis tristique.Vestibulum ante ipsum primis in
                            faucibus orci luctus et ultrices posuere
                            cubiliaCurae; Pellentesque quis cursus mauris. Nam
                            in ornare erat. Vestibulum convallisenim ac massa
                            dapibus consectetur. Maecenas facilisis eros ac
                            felis mattis, egetauctor sapien varius. <br />
                            <br />
                            Nulla non purus fermentum, pulvinar dui condimentum,
                            malesuada nibh. Sed viverra quam urna, at
                            condimentum ante viverra non. Mauris posuere erat
                            sapien, a convallis libero lobortis sit amet.
                            Suspendisse in orci tellus.
                          </p>
                          <br />
                          <p className="font-weight-bold">
                            Phasellus Efficitur
                          </p>
                          <p>
                            Tellus a sem condimentum, vitae convallis sapien
                            feugiat.Aenean non nibh nec nunc aliquam iaculis. Ut
                            quis suscipit nunc. Duis at lectusa est aliquam
                            venenatis vitae eget arcu. Sed egestas felis eget
                            convallismaximus. Curabitur maximus, ligula vel
                            sagittis iaculis, risus nisi tinciduntsem, ut
                            ultricies libero nulla eu ligula. Nam ultricies
                            mollis nulla, sedlaoreet leo convallis ac. Mauris
                            nisl risus, tincidunt ac diam aliquet,convallis
                            pellentesque nisi. Nam sit amet libero at odio
                            malesuada ultricies avitae dolor. Cras in viverra
                            felis, non consequat quam. Praesent a orci
                            enim.Vivamus porttitor nisi at nisl egestas iaculis.
                            Nullam commodo eget duisollicitudin sagittis. Duis
                            id nibh mollis, hendrerit metus
                            consectetur,ullamcorper risus. Morbi elementum
                            ultrices nunc, quis porta nisi ornare sitamet.
                            <br />
                            <br />
                            Etiam tincidunt orci in nisi aliquam placerat.
                            Aliquam finibus in sem utvehicula. Morbi eget
                            consectetur leo. Quisque consectetur lectus eros,
                            sedsodales libero ornare cursus. Etiam elementum ut
                            dolor eget hendrerit.Suspendisse eu lacus eu eros
                            lacinia feugiat sit amet non purus.
                            <br />
                            <br />
                            Pellentesque quis cursus mauris. Nam in ornare erat.
                            Vestibulum convallis enim ac massa dapibus
                            consectetur. Maecenas facilisis eros ac felis
                            mattis, eget auctor sapien varius.
                          </p>
                          <br />
                        </CardBody>
                      </Colxx>
                    </Row>
                  </TabPane>
                  <TabPane tabId="comments">
                    <Row>
                      <Colxx sm="12">
                        <CardBody>
                          {commentWithLikesData.map((item) => {
                            return (
                              <CommentWithLikes
                                data={item}
                                key={`comments_${item.key}`}
                              />
                            );
                          })}
                          <InputGroup className="comment-container">
                            <InputGroupAddon addonType="append">
                              <Button color="primary">
                                <i className="simple-icon-arrow-right ml-2" />
                              </Button>
                            </InputGroupAddon>
                          </InputGroup>
                        </CardBody>
                      </Colxx>
                    </Row>
                  </TabPane>
                  <TabPane tabId="questions">
                    <Row>
                      <Colxx sm="12">
                        <CardBody>asd</CardBody>
                      </Colxx>
                    </Row>
                  </TabPane>
                </TabContent>
              </Card>
            </Colxx>
          </Row>
        </Colxx>
      </Row>
    </>
  );
};
export default injectIntl(DetailsPages);
