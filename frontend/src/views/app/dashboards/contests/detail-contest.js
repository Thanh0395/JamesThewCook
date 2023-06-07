import React, { useEffect, useState } from 'react';
import {
  Row,
  Card,
  CardBody,
  Nav,
  NavItem,
  TabContent,
  TabPane,
  CardHeader,
  Button,
  // InputGroup,
  // InputGroupAddon,
  // Button,
} from 'reactstrap';
// import { NavLink } from 'react-router-dom';
import classnames from 'classnames';
import { injectIntl } from 'react-intl';
import Breadcrumb from 'containers/navs/Breadcrumb';
import { Separator, Colxx } from 'components/common/CustomBootstrap';
// import IntlMessages from 'helpers/IntlMessages';
// import GlideComponentThumbs from 'components/carousel/GlideComponentThumbs';
// import { detailImages, detailThumbs } from 'data/carouselItems';
// import detailsQuestionsData from 'data/questions';
// import CommentWithLikes from 'components/pages/CommentWithLikes';
// import { commentWithLikesData } from 'data/comments';
// import QuestionAnswer from 'components/pages/QuestionAnswer';
// import GalleryDetail from 'containers/pages/GalleryDetail';
import SingleLightbox from 'components/pages/SingleLightbox';
import Entry from 'components/ContestComponent/Entry';
import Participate from 'components/ContestComponent/Participate';
import { GetSc } from 'services/Sy_Api/SCApi';

const DetailsPages = ({ match, location }) => {
  const { contest } = location.state;
  const [activeTab, setActiveTab] = useState('Entrys');
  const [sc, setSc] = useState([]);
  const [reRender, setReRender] = useState(false);
  useEffect(() => {
    GetSc(contest.contestId).then((rs) => setSc(rs));
  }, [reRender])
  return (
    <>
      <Row>
        <Colxx xxs="12">
          <Breadcrumb match={match} />
          <Separator className="mb-5" />

          <Row>
            <Colxx xxs="12" xl="12" className="col-left">
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
                      <Button
                        className={classnames({
                          active: activeTab === 'Entrys',
                          'nav-link': true,
                        })}
                        onClick={() => setActiveTab('Entrys')}
                        // to="#"
                        // location={{}}
                      >
                        Entrys
                      </Button>
                    </NavItem>
                    <NavItem>
                      <Button
                        className={classnames({
                          active: activeTab === 'participate',
                          'nav-link': true,
                        })}
                        onClick={() => setActiveTab('participate')}
                        // to="#"
                        // location={{}}
                      >
                        Participate
                      </Button>
                    </NavItem>
                  </Nav>
                </CardHeader>
                <TabContent activeTab={activeTab}>
                  <TabPane tabId="Entrys">
                    <Entry sc = {sc} />
                  </TabPane>
                  <TabPane tabId="participate">
                    <Participate contestId = {contest.contestId} setReRender = {setReRender} setActiveTab={setActiveTab} />
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
