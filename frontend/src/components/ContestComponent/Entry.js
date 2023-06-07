import { Colxx } from 'components/common/CustomBootstrap';
import React, { useEffect, useState } from 'react';
import { Card, CardBody, Row } from 'reactstrap';
import { GetSc } from 'services/Sy_Api/SCApi';

function Entry({ contestId }) {
  const [sc, setSc] = useState([]);
  useEffect(() => {
    GetSc(contestId).then((rs) => setSc(rs));
  }, []);
  console.log(' List Sc', sc);
  return (
    <Row>
      <Colxx sm="12">
        <CardBody>
          <Row>
            {/* <Colxx xxs="12">
          <Row> */}
            {sc.map((item, index) => {
              /* eslint-disable react/no-array-index-key */
              return (
                <Colxx xxs="12" lg="6" className="mb-5" key={index}>
                  <Card className="flex-row listing-card-container">
                    <div className="w-50 position-relative">
                        <img
                          className="card-img-left"
                          src={`http://localhost:5013${item.image}`}
                          alt=""
                          aria-hidden="true"
                        />
                    </div>
                    <div className="w-60 d-flex align-items-center">
                      <CardBody>
                        <div style={{ fontWeight: 'bold' }}>{item.title}</div>
                        <div
                          style={{
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            maxWidth: '100px',
                          }}
                        >
                          {item.ingredients}
                        </div>
                      </CardBody>
                    </div>
                  </Card>
                </Colxx>
              );
            })}
            {/* </Row>
        </Colxx> */}
          </Row>
        </CardBody>
      </Colxx>
    </Row>
  );
}

export default Entry;
