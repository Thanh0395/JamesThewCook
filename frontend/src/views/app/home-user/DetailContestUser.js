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
} from 'reactstrap';
import classnames from 'classnames';
import { injectIntl } from 'react-intl';
import Breadcrumb from 'containers/navs/Breadcrumb';
import { Separator, Colxx } from 'components/common/CustomBootstrap';
import SingleLightbox from 'components/pages/SingleLightbox';
import Entry from 'components/ContestComponent/Entry';
import Participate from 'components/ContestComponent/Participate';
import { GetListSCByContestId } from 'services/Sy_Api/SCApi';
import { GetWinner } from 'services/Sy_Api/Rating';
import { GetContest } from 'services/Sy_Api/ContestApi';
import { getUserByIdAPI } from 'services/Thanh_Api/UserApi';
import { getCurrentUser } from 'helpers/Utils';

const DetailContestUser = ({ match, location }) => {
  const [contest, setContest] = useState(location.state.contest);
  const [activeTab, setActiveTab] = useState('Entrys');
  const [sc, setSc] = useState([]);
  const [reRender, setreRender] = useState(false);
  const [winner, setWinner] = useState();
  const currentUser = getCurrentUser();
  const getWinner = (contestId) => {
    GetWinner(contestId)
      .then(() => setreRender(!reRender))
      .catch((error) => {
        if (error.response.data.status === 404) {
          GetContest(contestId).then((rs) => setContest(rs));
          setreRender(!reRender);
        }
      });
  };
  useEffect(() => {
    GetContest(contest.contestId).then((rs) => {
      setContest(rs);
      if (rs.winner != null) {
        getUserByIdAPI(rs.winner).then((wn) => setWinner(wn));
      }
    });
    GetListSCByContestId(contest.contestId).then((rs) => setSc(rs));
  }, [reRender]);
  console.log('Contest', contest);
  console.log('Winner', winner);
  return (
    <>
      <Row>
        <Colxx xxs="12">
          <Breadcrumb match={match} />
          <Separator className="mb-5" />
          <Row>
            <Colxx xxs="12" xl="12">
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
                      <p>
                        {contest.endDate ? (
                          contest.endDate
                        ) : (
                          <strong>Still Available</strong>
                        )}
                      </p>
                    </div>
                    <div>
                      {winner && (
                        <div>
                          <h5>
                            <strong>Winner</strong>
                          </h5>
                          <h5>UserName: {winner.userName}</h5>
                          <h5>Email: {winner.email}</h5>
                          <img
                            className="card-img-left"
                            src={`http://localhost:5013${winner.avatar}`}
                            alt=""
                            aria-hidden="true"
                          />
                        </div>
                      )}
                    </div>
                    {currentUser.role === 'admin' && !contest.endDate ? (
                      <Button
                        color="primary"
                        onClick={() => getWinner(contest.contestId)}
                      >
                        End Contest
                      </Button>
                    ) : (
                      ''
                    )}
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
                      >
                        Participate
                      </Button>
                    </NavItem>
                  </Nav>
                </CardHeader>
                <TabContent activeTab={activeTab}>
                  <TabPane tabId="Entrys">
                    <Entry sc={sc} winner = {winner}/>
                  </TabPane>
                  <TabPane tabId="participate">
                    {!contest.endDate && (
                      <Participate
                        contestId={contest.contestId}
                        setreRender={setreRender}
                        reRender={reRender}
                        setActiveTab={setActiveTab}
                      />
                    )}
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
export default injectIntl(DetailContestUser);
