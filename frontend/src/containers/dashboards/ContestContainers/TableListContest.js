/* eslint-disable no-nested-ternary */
/* eslint-disable react/jsx-key */
/* eslint-disable react/no-array-index-key */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/display-name */
import React, { useEffect, useState } from 'react';
import {
  Button,
  Card,
  CardBody,
  CardImg,
  CardSubtitle,
  CardText,
  CardTitle,
  Row,
} from 'reactstrap';

import { Colxx } from 'components/common/CustomBootstrap';
// import IntlMessages from 'helpers/IntlMessages';
// import axios from 'axios';
import { DeleteContest, GetListContest } from 'services/Sy_Api/ContestApi';
import DetailContestModal from './DetailContest';
// import DetailRecipeModal from './DetailModal';
// import { NavLink } from 'react-router-dom';

const TableListContest = () => {
  const [initialContests, setInitialContests] = useState([]);
  const [contests, setContests] = useState([]);
  const effectList = useEffect(() => {
    console.log('effect getlist');
    GetListContest().then((rs) => {
      setInitialContests(rs);
      setContests(rs);
    });
  }, []);

  const handleDelete = async (Id) => {
    await DeleteContest(Id)
      .then((data) => {
        if (data.status === 200) {
          setInitialContests(initialContests.filter((item) => item.contestId !== Id));
          setContests(contests.filter((item) => item.contestId !== Id)
          );
        } else {
          console.log(data);
        }
      })
      .then(effectList);
  };

  // const handleDetail = (recipe)=>{
  //   toggle()
  //   console.log("detail :", recipe);
  //   setRecipeDetail(recipe)
  // }

  // const handleDetail = useCallback((recipe) => {
  //   toggle();
  //   console.log('detail :', recipe);
  //   setRecipeDetail(recipe);
  // }, []);

  return (
    <Row>
      {contests.map((item, index) => {
        return (
          <div key={index}>
            <Colxx xxs="12">
              <CardTitle className="mb-4">{item.title}</CardTitle>
              <Row>
                <Colxx xxs="12" xs="6" lg="4">
                  <Card className="mb-4">
                    <div className="position-relative">
                      <CardImg
                        top
                        src={item.FeatureImage}
                        alt="Card image cap"
                        style={{ width: '130px' }}
                      />
                    </div>
                    <CardBody>
                      <CardSubtitle className="mb-4">
                        {item.description}
                      </CardSubtitle>
                      <CardText className="text-muted text-medium mb-0 font-weight-light">
                        Prize: {item.prize}
                      </CardText>
                      <CardText className="text-muted text-medium mb-0 font-weight-light">
                        StartDate: {item.startDate}
                      </CardText>
                      <CardText className="text-muted text-medium mb-0 font-weight-light">
                        EndDate: {item.endDate}
                      </CardText>
                      <CardText className="text-muted text-small mb-0 font-weight-light">
                        {item.winner}
                      </CardText>
                      <Button outline size="sm" color="primary">
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
                    </CardBody>
                  </Card>
                </Colxx>
              </Row>
              <DetailContestModal />
            </Colxx>
          </div>
        );
      })}
    </Row>
  );
};
export default TableListContest;
