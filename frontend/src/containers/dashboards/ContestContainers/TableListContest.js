/* eslint-disable no-nested-ternary */
/* eslint-disable react/jsx-key */
/* eslint-disable react/no-array-index-key */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/display-name */
import React, { useCallback, useEffect, useState } from 'react';
import {
  Button,
  Card,
  CardBody,
  // CardImg,
  // CardSubtitle,
  // CardText,
  // CardTitle,
  NavLink,
  Row,
} from 'reactstrap';

// import LinesEllipsis from 'react-lines-ellipsis';
// import responsiveHOC from 'react-lines-ellipsis/lib/responsivehoc';
import { Colxx } from 'components/common/CustomBootstrap';
// import IntlMessages from 'helpers/IntlMessages';
// import axios from 'axios';
import { DeleteContest, GetListContest } from 'services/Sy_Api/ContestApi';
import UpdateContest from 'views/app/dashboards/contests/update-contest';
import UseModal from '../RecipeContainers/UseModal';
import DetailContest from './DetailContest';
// import DetailRecipeModal from './DetailModal';
// import { NavLink } from 'react-router-dom';

// const ResponsiveEllipsis = responsiveHOC()(LinesEllipsis);
const TableListContest = () => {
  const [selectedContestUpdate, setSelectedContestUpdate] = useState(null);
  const [initialContests, setInitialContests] = useState([]);
  const [contests, setContests] = useState([]);
  const { isShow, toggle } = UseModal();
  const [contestDetail, setContestDetail] = useState([]);
  useEffect(() => {
    console.log('effect getlist');
    GetListContest().then((rs) => {
      setInitialContests(rs);
      setContests(rs);
    });
  }, [selectedContestUpdate]);

  const handleDetail = useCallback((contest) => {
    toggle();
    console.log('detail :', contest);
    setContestDetail(contest);
  }, []);
  const handleDelete = async (Id) => {
    DeleteContest(Id).then((data) => {
      if (data.status === 200) {
        setInitialContests(
          initialContests.filter((item) => item.contestId !== Id)
        );
        setContests((prevContests) =>
          prevContests.filter((item) => item.contestId !== Id)
        );
      } else {
        console.log(data);
      }
    });
  };

  return (
    <>
      {selectedContestUpdate && ( // Render the update component if a recipe is selected
        <UpdateContest
          contest={selectedContestUpdate}
          setSelectedContestUpdate={setSelectedContestUpdate}
        />
      )}
      <Row>
        {/* <Colxx xxs="12">
          <Row> */}
        {contests.map((item, index) => {
          return (
            <Colxx xxs="12" lg="6" className="mb-5" key={`blogItem_${index}`}>
              <Card className="flex-row listing-card-container">
                <div className="w-50 position-relative">
                  <NavLink to="blog-detail">
                    <img
                      className="card-img-left"
                      src={`http://localhost:5013${item.featureImage}`}
                      alt=""
                      aria-hidden="true"
                    />
                  </NavLink>
                </div>
                <div className="w-60 d-flex align-items-center">
                  <CardBody>
                    <div style={{fontWeight: 'bold'}}>
                      {item.title}
                    </div>
                    <div
                      style={{
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        maxWidth: '100px',
                      }}
                    >
                      {item.description}
                    </div>
                    <Button
                      outline
                      size="sm"
                      color="primary"
                      onClick={() => handleDetail(item)}
                    >
                      View All
                    </Button>
                    <Button
                      outline
                      size="sm"
                      color="primary"
                      onClick={() => setSelectedContestUpdate(item)}
                    >
                      Edit
                    </Button>
                    <Button
                      outline
                      size="sm"
                      color="primary"
                      onClick={() => handleDelete(item.contestId)}
                    >
                      Delete
                    </Button>
                    <DetailContest
                      isShow={isShow}
                      hide={toggle}
                      contest={contestDetail}
                    />
                  </CardBody>
                </div>
              </Card>
            </Colxx>
          );
        })}
        {/* </Row>
        </Colxx> */}
      </Row>
    </>
  );
};

export default TableListContest;
