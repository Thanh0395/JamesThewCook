import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Card, CardBody, CardSubtitle, CardText } from 'reactstrap';
import { GetListContest } from 'services/Sy_Api/ContestApi';
import { getUserByIdAPI } from 'services/Thanh_Api/UserApi';
import ThumbnailImage from './ThumbnailImage';

const UserCardBasic = ({ link = '#' }) => {
  const [contest, setContest] = useState([]);
  const [winner, setWinner] = useState([]);
  useEffect(() => {
    GetListContest().then((rs) => {
      setContest(rs);
      rs.forEach((element) => {
        if (element.winner) {
          getUserByIdAPI(element.winner).then((wn) =>
            setWinner((prev) => [...prev, wn])
          );
        }
      });
    });
  }, []);
  console.log('Contest', contest);
  console.log('Winner', winner);
  return (
    <>
      {contest.map((item) => {
        return winner.map((it) => {
          return (
            item.winner === it.uId && (
              <Card className="d-flex flex-row mb-4">
                <NavLink to={link} className="d-flex">
                  <ThumbnailImage
                    rounded
                    src={`http://localhost:5013${item.featureImage}`}
                    small
                    alt="profile"
                    className="m-4"
                  />
                </NavLink>
                <div className=" d-flex flex-grow-1 min-width-zero">
                  <CardBody className=" pl-0 align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero">
                    <div className="min-width-zero">
                      <CardSubtitle className="truncate mb-1">
                        {item.title}
                      </CardSubtitle>
                      <NavLink
                        to={{
                          pathname: '/app/home-user/profile-user',
                          state: { uid: it.uId },
                        }}
                      >
                        <CardText className="text-muted text-small mb-2">
                          {it.email}
                        </CardText>
                      </NavLink>
                      <CardText className="text-muted text-small mb-2">
                        {it.userName}
                      </CardText>
                    </div>
                    <NavLink
                      to={{
                        pathname: '/app/home-user/profile-user',
                        state: { uid: it.uId },
                      }}
                    >
                      <ThumbnailImage
                        rounded
                        small
                        src={`http://localhost:5013${it.avatar}`}
                        alt="profile"
                        className="truncate mb-1"
                      />
                    </NavLink>
                  </CardBody>
                </div>
              </Card>
            )
          );
        });
      })}
    </>
  );
};

export default React.memo(UserCardBasic);
